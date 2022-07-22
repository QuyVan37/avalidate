using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DMS.Models;

namespace DMS.Controllers
{
    public class Die_Launch_ManagementController : Controller
    {
        private DMSEntities db = new DMSEntities();

        // GET: Die_Launch_Management
        public ActionResult Index()
        {
            ViewBag.ModelID = new SelectList(db.ModelLists, "ModelID", "ModelName");
            ViewBag.SupplierID = new SelectList(db.Suppliers, "SupplierID", "SupplierCode");
            return View();
        }

        public JsonResult getRecords(int? recordID, string following, string search, string[] modelID, string[] supplierID, string[] category, string[] FAresult, string[] procesCode,
           string POFrom, string POTo, string status, string statusPending, string deptRes, string export)
        {
            db.Configuration.ProxyCreationEnabled = false;

            modelID = modelID == null ? new string[0] {} : modelID;
            supplierID = supplierID == null ? new string[0] { } : supplierID;
            category = category == null ? new string[0] { } : category;
            FAresult = FAresult == null ? new string[0] { } : FAresult;
            procesCode = procesCode == null ? new string[0] { } : procesCode;
            var records = db.Die_Launch_Management.Where(x => x.isActive != false).Include(x => x.ModelList).Include(x => x.Supplier).ToList();

            if (recordID > 0)
            {
                records = records.Where(x => x.RecordID == recordID).ToList();
                goto exit;
            }

            if (!String.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                records = records.Where(x => x.Part_No.Contains(search)).ToList();
                if (records.Count() == 0)
                {
                    records = records.Where(x => x.Die_ID.Contains(search)).ToList();
                }
                goto exit;
            }
            // Bình thường chỉ lấy những part chưa closed đê renderView
            if (!String.IsNullOrEmpty(following))
            {
                if (following == "Closed")
                {
                    records = records.Where(x => x.isClosed == true).ToList();
                } else
                {
                    records = records.Where(x => x.isClosed != true).ToList();
                }
            }
            else
            {
                records = records.Where(x => x.isClosed != true).ToList();
            }

          

            if (modelID.Length > 0)
            {
                List<Die_Launch_Management> searchResult = new List<Die_Launch_Management>();
                foreach (var id in modelID)
                {
                    var res = records.Where(x => x.ModelID == int.Parse(id)).ToList();
                    searchResult.AddRange(res);
                }
                records = searchResult;
            }

            if (supplierID.Length > 0)
            {
                List<Die_Launch_Management> searchResult = new List<Die_Launch_Management>();
                foreach (var id in supplierID)
                {
                    var res = records.Where(x => x.SupplierID == int.Parse(id)).ToList();
                    searchResult.AddRange(res);
                }
                records = searchResult;
            }

            if (category.Length > 0)
            {
                List<Die_Launch_Management> searchResult = new List<Die_Launch_Management>();
                foreach (var item in category)
                {
                    var res = records.Where(x => getCategory(x.Die_No).Contains(item)).ToList();
                    searchResult.AddRange(res);
                }
                records = searchResult;
            }

            if (FAresult.Length > 0)
            {
                List<Die_Launch_Management> searchResult = new List<Die_Launch_Management>();
                foreach (var item in FAresult)
                {
                    var res = records.Where(x => x.FA_Result.Contains(item)).ToList();
                    searchResult.AddRange(res);
                }
                records = searchResult;
            }

            if (procesCode.Length > 0)
            {
                List<Die_Launch_Management> searchResult = new List<Die_Launch_Management>();
                foreach (var item in procesCode)
                {
                    var res = records.Where(x => x.FA_Result.Contains(item)).ToList();
                    searchResult.AddRange(res);
                }
                records = searchResult;
            }
            if (!String.IsNullOrEmpty(status))
            {
                records = records.Where(x => getStatus(x).Contains(status)).ToList();

            }
            if (!String.IsNullOrEmpty(statusPending))
            {
                records = records.Where(x => getPendingAndDeptResponse(x).Pending_Status.Contains(statusPending)).ToList();
            }
            if (!String.IsNullOrEmpty(deptRes))
            {
                records = records.Where(x => getPendingAndDeptResponse(x).Dept_Respone.Contains(deptRes)).ToList();
            }
            if (!string.IsNullOrEmpty(POFrom))
            {
                records = records.Where(x => x.PO_App_Date != null).ToList();
                records = records.Where(x => x.PO_App_Date >= DateTime.Parse(POFrom)).ToList();
            }
            if (!string.IsNullOrEmpty(POTo))
            {
                records = records.Where(x => x.PO_App_Date != null).ToList();
                records = records.Where(x => x.PO_App_Date <= DateTime.Parse(POTo)).ToList();
            }
            if (export == "Export")
            {
                // goto export
            }

        exit:
            var result = dataReturnView(records);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public string getCategory(string dieNo) // dieNo = 11A,21A,14A,16A
        {
            string outPut = "Invalid";
            if (!String.IsNullOrWhiteSpace(dieNo))
            {
                dieNo = dieNo.Trim().ToUpper();
                if (dieNo.Length == 3)
                {
                    if (dieNo == "11A") //  MT
                    {
                        outPut = "MT";
                    }
                    else
                    {
                        if (dieNo[0] != '1' && dieNo[1] == '1' && dieNo[2] == 'A')
                        {
                            outPut = "Additional";
                        }
                        else
                        {
                            if (dieNo[1] == '4')
                            {
                                outPut = "Renewal";
                            }
                            else
                            {
                                if (dieNo[1] == '6')
                                {
                                    outPut = "Overhaul";
                                }
                                else
                                {
                                    outPut = "Invalid";
                                }
                            }
                        }
                    }
                }
                else
                {
                    outPut = "Invalid";
                }
            }

            return outPut;
        }

        public string getStatus(Die_Launch_Management x)
        {
            // Late : FA OK/RS and Date Result > Target OK
            // Earlier : FA OK/RS and Date Result < Target OK 
            // Ontime : FA OK/RS and Date Result  = target OK
            // OnProgres : FA NG || Null : Today + 20 < target OK
            // Pending(x days) : FA NG || Null : Today > Target OK => x = today -target
            // Warning(x days left) : FA NG|| Null : Today >= target -20 && today < target  => x = target - today
            // Plz Input Target OK: Not input target OK.
            // Plz Input FA Result Date
            var today = DateTime.Now;
            string outPut = "";
            if (x.Target_OK_Date == null)
            {
                outPut = "Plz input Target OK";
            }
            else
            {
                if (x.FA_Result == "OK" || x.FA_Result == "RS")
                {
                    if (x.FA_Result_Date != null)
                    {
                        if (x.FA_Result_Date > x.Target_OK_Date)
                        {
                            outPut = "Late";
                        }
                        else
                        {
                            if (x.FA_Result_Date < x.Target_OK_Date)
                            {
                                outPut = "Earlier";
                            }
                            else
                            {
                                outPut = "OnTime";
                            }
                        }
                    }
                    else
                    {
                        outPut = "Plz Input FA OK Date";
                    }
                }
                else // FA NG
                {
                    if (today > x.Target_OK_Date)
                    {
                        outPut = "Pending( " + (today - x.Target_OK_Date.Value).Days + " days)";
                    }
                    else
                    {
                        if (today < x.Target_OK_Date && today.AddDays(20) >= x.Target_OK_Date)
                        {
                            outPut = "Warning(" + (x.Target_OK_Date.Value - today).Days + " days left)";
                        }
                        else
                        {
                            outPut = "On Progress";
                        }
                    }
                }
            }

            return outPut;
        }

        public class pending
        {
            public string Pending_Status { set; get; }
            public string Dept_Respone { set; get; }
            public int Progress { set; get; }
        }

        public pending getPendingAndDeptResponse(Die_Launch_Management x)
        {
            // 1.W-SelectSupplier => O%            
            // 2.W-QTN_Sub => 5%
            // 3.W-QTN_App. => 10%
            // 4.W-DFM_Sub => 15%
            // 5.W-DFM_PAE_Check =>15%
            // 6.W-DFM_PE1_Check => 20%
            // 7.W-DFM_PE1_App => 20%
            // 8.W-DFM_PAE_App => 25%
            // 9.W-MR_Issue => 30%
            //10.W-MR_App => 30%
            //11.W-PO_Issue => 35%
            //12.W-PO_App => 35%
            //13.W-T0_Plan => 40%
            //14.W-T0_trial => 40%
            //15.Plz Confirm T0 Result => 45%
            //16.W-FA_Plan => 45%
            //17.W-FA_Submit => 45%
            //18.Plz Confirm FA Submit? => 50%
            //19.W-FA_Result => 50%
            //20.W-RepairMethod => 60%
            //21.W-FA_ReSubmit => 70%
            //22.W-TVP_Issue => 80%
            //23.W-TVP_Result => 90%
            //24.W-ReTVP_Result => 90%
            //25.W-PCAR_Result => 95%
            //26.Done => 100%
            pending outPut = new pending();
            var today = DateTime.Now;

            if (String.IsNullOrWhiteSpace(x.Select_Supplier_Date))
            {
                outPut.Pending_Status = "1.W-SelectSupplier";
                outPut.Dept_Respone = "PUS";
                outPut.Progress = 0;
                return outPut;
            }

            if (String.IsNullOrWhiteSpace(x.QTN_Sub_Date))
            {
                outPut.Pending_Status = "2.W-QTN_Sub";
                outPut.Dept_Respone = "PUR";
                outPut.Progress = 5;
                return outPut;
            }

            if (String.IsNullOrWhiteSpace(x.QTN_App_Date))
            {
                outPut.Pending_Status = "3.W-QTN_App";
                outPut.Dept_Respone = "PUS";
                outPut.Progress = 10;
                return outPut;
            }

            if (String.IsNullOrWhiteSpace(x.DFM_Sub_Date))
            {
                outPut.Pending_Status = "4.W-DFM_Sub";
                outPut.Dept_Respone = "PUR";
                outPut.Progress = 15;
                return outPut;
            }
            if (String.IsNullOrWhiteSpace(x.DFM_PAE_Check_Date))
            {
                outPut.Pending_Status = "5.W-DFM_PAE_Check";
                outPut.Dept_Respone = "PAE";
                outPut.Progress = 15;
                return outPut;
            }
            if (String.IsNullOrWhiteSpace(x.DFM_PE_Check_Date))
            {
                outPut.Pending_Status = "6.W-DFM_PE1_Check";
                outPut.Dept_Respone = "PE1";
                outPut.Progress = 15;
                return outPut;
            }
            if (String.IsNullOrWhiteSpace(x.DFM_PE_App_Date))
            {
                outPut.Pending_Status = "7.W-DFM_PE1_App";
                outPut.Dept_Respone = "PE1";
                outPut.Progress = 20;
                return outPut;
            }
            if (String.IsNullOrWhiteSpace(x.DFM_PAE_App_Date))
            {
                outPut.Pending_Status = "8.W-DFM_PAE_App";
                outPut.Dept_Respone = "PAE";
                outPut.Progress = 25;
                return outPut;
            }
            if (x.MR_Request_Date == null)
            {
                outPut.Pending_Status = "9.W-MR_Issue";
                outPut.Dept_Respone = "PUR";
                outPut.Progress = 30;
                return outPut;
            }
            if (x.MR_App_Date == null)
            {
                outPut.Pending_Status = "10.W-MR_App";
                outPut.Dept_Respone = "PAE";
                outPut.Progress = 30;
                return outPut;
            }
            if (x.PO_Issue_Date == null)
            {
                outPut.Pending_Status = "11.W-PO_Issue";
                outPut.Dept_Respone = "PUR";
                outPut.Progress = 35;
                return outPut;
            }
            if (x.PO_App_Date == null)
            {
                outPut.Pending_Status = "12.W-PO_App";
                outPut.Dept_Respone = "PUR";
                outPut.Progress = 35;

                return outPut;
            }


            if (x.T0_Actual == null && String.IsNullOrWhiteSpace(x.T0_Result))// chưa có T0 Actual || result
            {
                if (x.T0_Plan == null) // chưa có T0 plan
                {
                    outPut.Pending_Status = "13.W-T0_Plan";
                    outPut.Dept_Respone = "PUR";
                    outPut.Progress = 40;

                    return outPut;
                }
                else // Đã có TO plan
                {
                    if (x.T0_Plan > today)
                    {
                        outPut.Pending_Status = "14.W-T0_trial";
                        outPut.Dept_Respone = "Supplier";
                        outPut.Progress = 40;
                        return outPut;
                    }
                    else // Đã qua T0 Plan
                    {
                        outPut.Pending_Status = "15.Plz Confirm T0 Result";
                        outPut.Dept_Respone = "PAE";
                        outPut.Progress = 45;
                        return outPut;
                    }
                }
            }
            else // Đã có Actual || result To
            {
                // Kiểm tra FA PLan
                if (x.FA_Plan == null) // Chưa có FA plan
                {
                    outPut.Pending_Status = "16.W-FA_Plan";
                    outPut.Dept_Respone = "PUR";
                    outPut.Progress = 45;

                    return outPut;
                }
                else // Đã có FA Plan
                {
                    if (today < x.FA_Plan) // chưa đến Plan
                    {
                        if (String.IsNullOrWhiteSpace(x.FA_Result)) // chưa có Result
                        {
                            outPut.Pending_Status = "17.W-FA_Submit";
                            outPut.Dept_Respone = "Supplier";
                            outPut.Progress = 45;
                            return outPut;
                        }
                        else // Đã có FA result
                        {
                            if (x.FA_Result == "OK" || x.FA_Result == "RS" || x.FA_Result == "WMT") // FA OK
                            {
                                if (getCategory(x.Die_No) == "MT")
                                {
                                    outPut.Pending_Status = "26.Done";
                                    outPut.Dept_Respone = "-";
                                    outPut.Progress = 100;
                                    return outPut;
                                }
                                else // RN & AD & OH
                                {
                                    if (String.IsNullOrWhiteSpace(x.TVP_No)) // chưa issue TVP
                                    {
                                        outPut.Pending_Status = "22.W-TVP_Issue";
                                        outPut.Dept_Respone = "PE1";
                                        outPut.Progress = 80;
                                        return outPut;
                                    }
                                    else // đã issue TVP
                                    {
                                        if (String.IsNullOrWhiteSpace(x.TVP_Result)) // chưa có TVP result
                                        {
                                            outPut.Pending_Status = "23.W-TVP_Result";
                                            outPut.Dept_Respone = "PDC";
                                            outPut.Progress = 90;
                                            return outPut;
                                        }
                                        else // đã có TVP result
                                        {
                                            if (x.TVP_Result.ToUpper().Contains("OK"))
                                            {
                                                if (String.IsNullOrWhiteSpace(x.PCAR_Result))
                                                {
                                                    outPut.Pending_Status = "25.W-PCAR_Result";
                                                    outPut.Dept_Respone = "MQA";
                                                    outPut.Progress = 95;
                                                    return outPut;
                                                }
                                                else
                                                {
                                                    if (x.PCAR_Result.ToUpper().Contains("OK"))
                                                    {
                                                        outPut.Pending_Status = "26.Done";
                                                        outPut.Dept_Respone = "-";
                                                        outPut.Progress = 100;
                                                        return outPut;
                                                    }
                                                    else
                                                    {
                                                        outPut.Pending_Status = "25.W-PCAR_Result";
                                                        outPut.Dept_Respone = "MQA";
                                                        outPut.Progress = 95;
                                                        return outPut;
                                                    }
                                                }
                                            }
                                            else // TVP NG
                                            {
                                                outPut.Pending_Status = "24.W-ReTVP_Result";
                                                outPut.Dept_Respone = "PDC";
                                                outPut.Progress = 90;
                                                return outPut;
                                            }
                                        }
                                    }

                                }
                            }
                            else // FA NG || đang đánh giá 
                            {
                                if (x.FA_Result == "NG" || x.FA_Result == "NGA" || x.FA_Result == "NGB") // FA NG
                                {
                                    if (String.IsNullOrWhiteSpace(x.FA_Action_Improve)) // PAE chưa instruct
                                    {
                                        outPut.Pending_Status = "20.W-RepairMethod";
                                        outPut.Dept_Respone = "PAE";
                                        outPut.Progress = 60;
                                        return outPut;
                                    }
                                    else // PAE đã instruct
                                    {
                                        outPut.Pending_Status = "21.W-FA_ReSubmit";
                                        outPut.Dept_Respone = "Supplier";
                                        outPut.Progress = 70;
                                        return outPut;
                                    }
                                }
                                else // Đang Đánh giá FA
                                {
                                    outPut.Pending_Status = "19.W-FA_Result";
                                    outPut.Dept_Respone = String.IsNullOrEmpty(x.FA_Result) ? "PUR" : x.FA_Result;
                                    outPut.Progress = 50;
                                    return outPut;
                                }
                            }
                        }

                    }
                    else // đã đến Plan 
                    {
                        if (String.IsNullOrEmpty(x.FA_Result)) // chưa có FA result 
                        {
                            outPut.Pending_Status = "18.Plz Confirm FA Submit?";
                            outPut.Dept_Respone = "PUR";
                            outPut.Progress = 50;
                            return outPut;
                        }
                        else // ĐÃ có FA Result 
                        {
                            if (x.FA_Result == "OK" || x.FA_Result == "RS" || x.FA_Result == "WMT") // FA OK
                            {
                                if (getCategory(x.Die_No) == "MT")
                                {
                                    outPut.Pending_Status = "26.Done";
                                    outPut.Dept_Respone = "-";
                                    outPut.Progress = 100;
                                    return outPut;
                                }
                                else // RN & AD & OH
                                {
                                    if (String.IsNullOrWhiteSpace(x.TVP_No)) // chưa issue TVP
                                    {
                                        outPut.Pending_Status = "22.W-TVP_Issue";
                                        outPut.Dept_Respone = "PE1";
                                        outPut.Progress = 80;
                                        return outPut;
                                    }
                                    else // đã issue TVP
                                    {
                                        if (String.IsNullOrWhiteSpace(x.TVP_Result)) // chưa có TVP result
                                        {
                                            outPut.Pending_Status = "23.W-TVP_Result";
                                            outPut.Dept_Respone = "PDC";
                                            outPut.Progress = 90;

                                            return outPut;
                                        }
                                        else // đã có TVP result
                                        {
                                            if (x.TVP_Result.ToUpper().Contains("OK"))
                                            {
                                                if (String.IsNullOrWhiteSpace(x.PCAR_Result))
                                                {
                                                    outPut.Pending_Status = "25.W-PCAR_Result";
                                                    outPut.Dept_Respone = "MQA";
                                                    outPut.Progress = 95;
                                                    return outPut;
                                                }
                                                else
                                                {
                                                    if (x.PCAR_Result.ToUpper().Contains("OK"))
                                                    {
                                                        outPut.Pending_Status = "26.Done";
                                                        outPut.Dept_Respone = "-";
                                                        outPut.Progress = 100;
                                                        return outPut;
                                                    }
                                                    else
                                                    {
                                                        outPut.Pending_Status = "25.W-PCAR_Result";
                                                        outPut.Dept_Respone = "MQA";
                                                        outPut.Progress = 95;
                                                        return outPut;
                                                    }
                                                }
                                            }
                                            else // TVP NG
                                            {
                                                outPut.Pending_Status = "24.W-ReTVP_Result";
                                                outPut.Dept_Respone = "PDC";
                                                outPut.Progress = 90;
                                                return outPut;
                                            }
                                        }
                                    }

                                }
                            }
                            else // FA NG || Đang đánh giá
                            {
                                if (x.FA_Result == "NG" || x.FA_Result == "NGA" || x.FA_Result == "NGB") // FA NG
                                {
                                    if (String.IsNullOrWhiteSpace(x.FA_Action_Improve)) // PAE chưa instruct
                                    {
                                        outPut.Pending_Status = "20.W-RepairMethod";
                                        outPut.Dept_Respone = "PAE";
                                        outPut.Progress = 60;
                                        return outPut;
                                    }
                                    else // PAE đã instruct
                                    {
                                        outPut.Pending_Status = "16.W-FA_Plan";
                                        outPut.Dept_Respone = "PUR";
                                        outPut.Progress = 45;
                                        return outPut;
                                    }
                                }
                                else // Đang Đánh giá FA
                                {
                                    outPut.Pending_Status = "19.W-FA_Result";
                                    outPut.Dept_Respone = String.IsNullOrEmpty(x.FA_Result) ? "PUR" : x.FA_Result;
                                    outPut.Progress = 50;
                                    return outPut;
                                }
                            }
                        }
                    }
                }
            }
        }

        public List<string> getWarning(Die_Launch_Management x)
        {
            List<string> outPut = new List<string>();
            if (!getPendingAndDeptResponse(x).Pending_Status.Contains("Done"))
            {
                var w = (DateTime.Now - x.Latest_Pending_Status_Changed.Value).Days + "day(s) still not change status";
                outPut.Add(w);
            }
            else
            {
                outPut.Add("");
            }
            if (x.Texture == null)
            {
                outPut.Add("Lets confirm has Texture or not?");
            }
            if (x.JIG_Using == null)
            {
                outPut.Add("Lets confirm has JIG or not?");
            }
            if (x.JIG_Using == true)
            {
                if (String.IsNullOrWhiteSpace(x.JIG_ETA_Supplier))
                {
                    outPut.Add("Lets confirm JIG ETA supplier");
                }
                else
                {
                    DateTime JIGETA;
                    var result = DateTime.TryParse(x.JIG_ETA_Supplier, out JIGETA);
                    if (result)
                    {
                        if (JIGETA > x.T0_Plan)
                        {
                            outPut.Add("JIG ETA later than T0 plan => plz push up JIG");
                        }
                    }
                }
            }


            return outPut;
        }

        public JsonResult getListFAResultCategory()
        {
            string[] result = { "MQA", "PQA", "OQA", "PE1", "PAE", "OK", "RS", "WMT", "NG", "NGA", "NGB" };

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getListSupplier()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var result = db.Suppliers.ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getListModel()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var result = db.ModelLists.ToList();

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        // SAVE DATA 

        public JsonResult SaveData(Die_Launch_Management record, HttpPostedFileBase DFMMaker, HttpPostedFileBase DFMPAEChecked,
            HttpPostedFileBase DFMPE1Checked, HttpPostedFileBase DFMPE1App, HttpPostedFileBase DFMPAEApp,
            HttpPostedFileBase ToAttachment, HttpPostedFileBase FAAttachment)
        {
            // Check Quyền Update 
            var status = false;
            var today = DateTime.Now;
            db.Configuration.ProxyCreationEnabled = false;
            var findRecord = db.Die_Launch_Management.Include(x => x.Supplier).Include(x => x.ModelList).Where(x => x.RecordID == record.RecordID).FirstOrDefault();
            //*********************************************
            // Giữ lại pending_status trước khi được update
            var currentPendingStatus = getPendingAndDeptResponse(findRecord).Pending_Status;
            //**********************************************


            // update nếu có value chuyển lên.
            findRecord.Step = record.Step == null ? findRecord.Step : record.Step;

            findRecord.Step = record.Step == null ? findRecord.Step : record.Step;
            findRecord.Rank = record.Rank == null ? findRecord.Rank : record.Rank;
            // Kiển trả part No hợp lệ hay ko?
            if (!String.IsNullOrEmpty(record.Part_No))
            {
                var partNo = record.Part_No.ToUpper().Trim();
                if (partNo.Length == 12) //RC5-1234-000
                {
                    findRecord.Part_No = partNo;
                }
            }
            findRecord.Part_name = record.Part_name == null ? findRecord.Part_name : record.Part_name;
            findRecord.Process_Code = record.Process_Code == null ? findRecord.Process_Code : record.Process_Code;
            //Kiểm trả Die NO Hợp lệ hay KO?
            if (!String.IsNullOrEmpty(record.Die_No))
            {
                var dieNo = record.Die_No.ToUpper().Trim();
                if (dieNo.Length == 3) //RC5-1234-000
                {
                    findRecord.Die_No = dieNo;
                }
            }

            findRecord.Die_ID = findRecord.Part_No + "-" + findRecord.Die_No + "-001"; //RC5-1234-000-11A-001
            findRecord.ModelID = record.ModelID == null ? findRecord.ModelID : record.ModelID;
            findRecord.SupplierID = record.SupplierID == null ? findRecord.SupplierID : record.SupplierID;
            findRecord.Texture = record.Texture == null ? findRecord.Texture : record.Texture;

            // Genaral được update nối đôi
            if (!String.IsNullOrWhiteSpace(record.Genaral_Information))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + " :" + record.Genaral_Information + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.Decision_Date = record.Decision_Date == null ? findRecord.Decision_Date : record.Decision_Date;
            if (String.IsNullOrWhiteSpace(findRecord.Select_Supplier_Date) && !String.IsNullOrWhiteSpace(record.Select_Supplier_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": Select Supplier on " + record.Select_Supplier_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.Select_Supplier_Date = record.Select_Supplier_Date == null ? findRecord.Select_Supplier_Date : record.Select_Supplier_Date;

            if (String.IsNullOrWhiteSpace(findRecord.QTN_Sub_Date) && !String.IsNullOrWhiteSpace(record.QTN_Sub_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": QTN submit on " + record.QTN_Sub_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.QTN_Sub_Date = record.QTN_Sub_Date == null ? findRecord.QTN_Sub_Date : record.QTN_Sub_Date;

            if (String.IsNullOrWhiteSpace(findRecord.QTN_App_Date) && !String.IsNullOrWhiteSpace(record.QTN_App_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": QTN App on " + record.QTN_App_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.QTN_App_Date = record.QTN_App_Date == null ? findRecord.QTN_App_Date : record.QTN_App_Date;

            findRecord.Need_Use_Date = record.Need_Use_Date == null ? findRecord.Need_Use_Date : record.Need_Use_Date;
            findRecord.Target_OK_Date = record.Target_OK_Date == null ? findRecord.Target_OK_Date : record.Target_OK_Date;
            findRecord.Inv_Idea = record.Inv_Idea == null ? findRecord.Inv_Idea : record.Inv_Idea;
            findRecord.Inv_FB_To = record.Inv_FB_To == null ? findRecord.Inv_FB_To : record.Inv_FB_To;
            findRecord.Inv_Result = record.Inv_Result == null ? findRecord.Inv_Result : record.Inv_Result;
            findRecord.Inv_Cost_Down = record.Inv_Cost_Down == null ? findRecord.Inv_Cost_Down : record.Inv_Cost_Down;

            if (String.IsNullOrWhiteSpace(findRecord.DFM_Sub_Date) && !String.IsNullOrWhiteSpace(record.DFM_Sub_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DMF submit on " + record.DFM_Sub_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.DFM_Sub_Date = record.DFM_Sub_Date == null ? findRecord.DFM_Sub_Date : record.DFM_Sub_Date;

            if (String.IsNullOrWhiteSpace(findRecord.DFM_PAE_Check_Date) && !String.IsNullOrWhiteSpace(record.DFM_PAE_Check_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DMF submit on " + record.DFM_PAE_Check_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.DFM_PAE_Check_Date = record.DFM_PAE_Check_Date == null ? findRecord.DFM_PAE_Check_Date : record.DFM_PAE_Check_Date;

            if (String.IsNullOrWhiteSpace(findRecord.DFM_PE_Check_Date) && !String.IsNullOrWhiteSpace(record.DFM_PE_Check_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DMF submit on " + record.DFM_PE_Check_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.DFM_PE_Check_Date = record.DFM_PE_Check_Date == null ? findRecord.DFM_PE_Check_Date : record.DFM_PE_Check_Date;

            if (String.IsNullOrWhiteSpace(findRecord.DFM_PE_App_Date) && !String.IsNullOrWhiteSpace(record.DFM_PE_App_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DMF submit on " + record.DFM_PE_App_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.DFM_PE_App_Date = record.DFM_PE_App_Date == null ? findRecord.DFM_PE_App_Date : record.DFM_PE_App_Date;

            if (String.IsNullOrWhiteSpace(findRecord.DFM_PAE_App_Date) && !String.IsNullOrWhiteSpace(record.DFM_PAE_App_Date))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DMF submit on " + record.DFM_PAE_App_Date + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.DFM_PAE_App_Date = record.DFM_PAE_App_Date == null ? findRecord.DFM_PAE_App_Date : record.DFM_PAE_App_Date;

            findRecord.Die_Mat = record.Die_Mat == null ? findRecord.Die_Mat : record.Die_Mat;
            findRecord.Slider_Mat = record.Slider_Mat == null ? findRecord.Slider_Mat : record.Slider_Mat;
            findRecord.Lifter_Mat = record.Lifter_Mat == null ? findRecord.Lifter_Mat : record.Lifter_Mat;
            findRecord.Hot_runner = record.Hot_runner == null ? findRecord.Hot_runner : record.Hot_runner;
            findRecord.Gate = record.Gate == null ? findRecord.Gate : record.Gate;
            findRecord.MC_Size = record.MC_Size == null ? findRecord.MC_Size : record.MC_Size;
            findRecord.Cav_Qty = record.Cav_Qty == null ? findRecord.Cav_Qty : record.Cav_Qty;
            findRecord.Die_Made_Location = record.Die_Made_Location == null ? findRecord.Die_Made_Location : record.Die_Made_Location;
            findRecord.Die_Maker = record.Die_Maker == null ? findRecord.Die_Maker : record.Die_Maker;
            findRecord.Family_Die_With = record.Family_Die_With == null ? findRecord.Family_Die_With : record.Family_Die_With;
            findRecord.Common_Part_With = record.Common_Part_With == null ? findRecord.Common_Part_With : record.Common_Part_With;
            findRecord.Die_Special = record.Die_Special == null ? findRecord.Die_Special : record.Die_Special;
            findRecord.DSUM_Idea = record.DSUM_Idea == null ? findRecord.DSUM_Idea : record.DSUM_Idea;
            // Tạm thòi giữ lại
            // sẽ được tự đông update PO issue và PO App
            findRecord.PO_Issue_Date = record.PO_Issue_Date == null ? findRecord.PO_Issue_Date : record.PO_Issue_Date;
            findRecord.PO_App_Date = record.PO_App_Date == null ? findRecord.PO_App_Date : record.PO_App_Date;
            //**************************

            findRecord.Design_Check_Plan = record.Design_Check_Plan == null ? findRecord.Design_Check_Plan : record.Design_Check_Plan;
            findRecord.Design_Check_Actual = record.Design_Check_Actual == null ? findRecord.Design_Check_Actual : record.Design_Check_Actual;
            findRecord.Design_Check_Result = record.Design_Check_Result == null ? findRecord.Design_Check_Result : record.Design_Check_Result;
            findRecord.NoOfPoit_Not_FL_DMF = record.NoOfPoit_Not_FL_DMF == null ? findRecord.NoOfPoit_Not_FL_DMF : record.NoOfPoit_Not_FL_DMF;
            findRecord.NoOfPoint_Not_FL_Spec = record.NoOfPoint_Not_FL_Spec == null ? findRecord.NoOfPoint_Not_FL_Spec : record.NoOfPoint_Not_FL_Spec;
            findRecord.NoOfPoint_Kaizen = record.NoOfPoint_Kaizen == null ? findRecord.NoOfPoint_Kaizen : record.NoOfPoint_Kaizen;
            findRecord.JIG_Using = record.JIG_Using == null ? findRecord.JIG_Using : record.JIG_Using;
            findRecord.JIG_No = record.JIG_No == null ? findRecord.JIG_No : record.JIG_No;
            findRecord.JIG_Check_Plan = record.JIG_Check_Plan == null ? findRecord.JIG_Check_Plan : record.JIG_Check_Plan;
            findRecord.JIG_Check_Result = record.JIG_Check_Result == null ? findRecord.JIG_Check_Result : record.JIG_Check_Result;
            findRecord.JIG_ETA_Supplier = record.JIG_ETA_Supplier == null ? findRecord.JIG_ETA_Supplier : record.JIG_ETA_Supplier;
            findRecord.JIG_Status = record.JIG_Status == null ? findRecord.JIG_Status : record.JIG_Status;
            findRecord.T0_Plan = record.T0_Plan == null ? findRecord.T0_Plan : record.T0_Plan;
            findRecord.T0_Actual = record.T0_Actual == null ? findRecord.T0_Actual : record.T0_Actual;

            if (String.IsNullOrWhiteSpace(findRecord.T0_Result) && !String.IsNullOrWhiteSpace(record.T0_Result))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": TO trial result " + record.T0_Result + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.T0_Result = record.T0_Result == null ? findRecord.T0_Result : record.T0_Result;

            findRecord.T0_Solve_Method = record.T0_Solve_Method == null ? findRecord.T0_Solve_Method : record.T0_Solve_Method;
            findRecord.T0_Solve_Result = record.T0_Solve_Result == null ? findRecord.T0_Solve_Result : record.T0_Solve_Result;
            findRecord.Texture_Meeting_Date = record.Texture_Meeting_Date == null ? findRecord.Texture_Meeting_Date : record.Texture_Meeting_Date;
            findRecord.Texture_Go_Date = record.Texture_Go_Date == null ? findRecord.Texture_Go_Date : record.Texture_Go_Date;
            findRecord.S0_Plan = record.S0_Plan == null ? findRecord.S0_Plan : record.S0_Plan;
            findRecord.S0_Result = record.S0_Result == null ? findRecord.S0_Result : record.S0_Result;
            findRecord.S0_Solve_Method = record.S0_Solve_Method == null ? findRecord.S0_Solve_Method : record.S0_Solve_Method;
            findRecord.S0_solve_Result = record.S0_solve_Result == null ? findRecord.S0_solve_Result : record.S0_solve_Result;
            findRecord.Texture_App_Date = record.Texture_App_Date == null ? findRecord.Texture_App_Date : record.Texture_App_Date;
            findRecord.Texture_Internal_App_Result = record.Texture_Internal_App_Result == null ? findRecord.Texture_Internal_App_Result : record.Texture_Internal_App_Result;
            findRecord.Texture_JP_HP_App_Result = record.Texture_JP_HP_App_Result == null ? findRecord.Texture_JP_HP_App_Result : record.Texture_JP_HP_App_Result;
            findRecord.Texture_Note = record.Texture_Note == null ? findRecord.Texture_Note : record.Texture_Note;
            findRecord.PreKK_Plan = record.PreKK_Plan == null ? findRecord.PreKK_Plan : record.PreKK_Plan;
            findRecord.PreKK_Actual = record.PreKK_Actual == null ? findRecord.PreKK_Actual : record.PreKK_Actual;



            findRecord.FA_Plan = record.FA_Plan == null ? findRecord.FA_Plan : record.FA_Plan;
            if (!String.IsNullOrWhiteSpace(record.FA_Result))
            {
                if (findRecord.FA_Result != record.FA_Result)
                {
                    findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": FA Result/Position " + record.FA_Result + System.Environment.NewLine + findRecord.Genaral_Information;
                    if (record.FA_Result_Date == null)
                    {
                        record.FA_Result_Date = today;
                    }

                }
            }

            findRecord.FA_Result = record.FA_Result == null ? findRecord.FA_Result : record.FA_Result;
            findRecord.FA_Result_Date = record.FA_Result_Date == null ? findRecord.FA_Result_Date : record.FA_Result_Date;
            findRecord.FA_Problem = record.FA_Problem == null ? findRecord.FA_Problem : record.FA_Problem;

            if (String.IsNullOrWhiteSpace(findRecord.FA_Action_Improve) && !String.IsNullOrWhiteSpace(record.FA_Action_Improve))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": Action Improve FA " + record.FA_Action_Improve + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.FA_Action_Improve = record.FA_Action_Improve == null ? findRecord.FA_Action_Improve : record.FA_Action_Improve;
            findRecord.MT1_Date = record.MT1_Date == null ? findRecord.MT1_Date : record.MT1_Date;
            findRecord.MT1_Gather_Date = record.MT1_Gather_Date == null ? findRecord.MT1_Gather_Date : record.MT1_Gather_Date;
            findRecord.MT1_Problem = record.MT1_Problem == null ? findRecord.MT1_Problem : record.MT1_Problem;
            findRecord.MT1_Remark = record.MT1_Remark == null ? findRecord.MT1_Remark : record.MT1_Remark;
            findRecord.MTF_Date = record.MTF_Date == null ? findRecord.MTF_Date : record.MTF_Date;
            findRecord.MTF_Gather_Date = record.MTF_Gather_Date == null ? findRecord.MTF_Gather_Date : record.MTF_Gather_Date;
            findRecord.MTF_Problem = record.MTF_Problem == null ? findRecord.MTF_Problem : record.MTF_Problem;
            findRecord.MTF_Remark = record.MTF_Remark == null ? findRecord.MTF_Remark : record.MTF_Remark;

            if (String.IsNullOrWhiteSpace(findRecord.TVP_No) && !String.IsNullOrWhiteSpace(record.TVP_No))
            {
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": Issue TVP " + record.TVP_No + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            findRecord.TVP_No = record.TVP_No == null ? findRecord.TVP_No : record.TVP_No;
            findRecord.ERI_No = record.ERI_No == null ? findRecord.ERI_No : record.ERI_No;
            if (!String.IsNullOrWhiteSpace(record.TVP_Result))
            {
                if (findRecord.TVP_Result != record.TVP_Result)
                {
                    findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": TVP Result/Position " + record.TVP_Result + System.Environment.NewLine + findRecord.Genaral_Information;
                }
            }

            findRecord.TVP_Result = record.TVP_Result == null ? findRecord.TVP_Result : record.TVP_Result;
            findRecord.TVP_Result_Date = record.TVP_Result_Date == null ? findRecord.TVP_Result_Date : record.TVP_Result_Date;
            findRecord.TVP_Remark = record.TVP_Remark == null ? findRecord.TVP_Remark : record.TVP_Remark;
            findRecord.PCAR_Date = record.PCAR_Date == null ? findRecord.PCAR_Date : record.PCAR_Date;
            if (!String.IsNullOrWhiteSpace(record.PCAR_Result))
            {
                if (findRecord.PCAR_Result != record.PCAR_Result)
                {
                    findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": TVP Result/Position " + record.PCAR_Result + System.Environment.NewLine + findRecord.Genaral_Information;
                }
            }

            findRecord.PCAR_Result = record.PCAR_Result == null ? findRecord.PCAR_Result : record.PCAR_Result;
            findRecord.First_Lot_Date = record.First_Lot_Date == null ? findRecord.First_Lot_Date : record.First_Lot_Date;

            // Sửa lại code khi app
            findRecord.Latest_Update_By = "User";
            findRecord.Latest_Update_Date = today;




            // Làm gì khi pending status thay đôi

            // 1. Tính Số lần submit
            //******Làm thế nào để tính số lần submit Time
            // Mặc định là 1 lần
            // Nếu nhảy sang trạng thái W-FA-Resubmit => + 1 => nhưng chỉ hiện thị Số lần submitFA - 1

            // 2. Record lại thời gian thay đổi trạng thái


            {
                //*********************************************
                // pending_status sau khi được update
                var newPendingStatus = getPendingAndDeptResponse(findRecord);
                //**********************************************
                if (findRecord.FA_Sub_Time == null || findRecord.FA_Sub_Time == 0)
                {
                    findRecord.FA_Sub_Time = 1;
                }
                if (currentPendingStatus != newPendingStatus.Pending_Status)
                {
                    //1. Tính số lần submit FA 
                    if (newPendingStatus.Pending_Status.Contains("FA_ReSubmit"))
                    {
                        findRecord.FA_Sub_Time = findRecord.FA_Sub_Time + 1;
                    }
                    findRecord.Latest_Pending_Status_Changed = today;

                    //2. Record lại thời điểm thay đổi trạng thái
                    // 2.1 lưu mới
                    RecordChangeStatusPending newChange = new RecordChangeStatusPending()
                    {
                        RecordID = findRecord.RecordID,
                        PendingStatusName = newPendingStatus.Pending_Status,
                        DeptResponse = newPendingStatus.Dept_Respone,
                        StartDate = today
                    };
                    db.RecordChangeStatusPendings.Add(newChange);
                    db.SaveChanges();
                    // 2.2 update old
                    var oldStatus = db.RecordChangeStatusPendings.Where(x => x.RecordID == findRecord.RecordID && x.PendingStatusName == currentPendingStatus).OrderByDescending(x => x.RecordID).FirstOrDefault();
                    if (oldStatus != null)
                    {
                        oldStatus.EndDate = today;
                        db.Entry(oldStatus).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                    else
                    {
                        RecordChangeStatusPending oldChange = new RecordChangeStatusPending()
                        {
                            RecordID = findRecord.RecordID,
                            PendingStatusName = newPendingStatus.Pending_Status,
                            DeptResponse = newPendingStatus.Dept_Respone,
                            EndDate = today
                        };
                        db.RecordChangeStatusPendings.Add(oldChange);
                        db.SaveChanges();
                    }
                }

                if (newPendingStatus.Pending_Status.Contains("Done"))
                {
                    findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": Done! " + System.Environment.NewLine + findRecord.Genaral_Information;
                }
            }



            // Luu File vật lí
            if (DFMMaker != null) // có att file
            {


                var fileExt = Path.GetExtension(DFMMaker.FileName);
                // Code luu file vào folder
                var fileName = "DFM_Supplier_Submit_" + findRecord.Die_ID + today.ToString("yyyy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                DFMMaker.SaveAs(path);


                findRecord.AttDFMMaker = fileName;
                findRecord.DFM_Sub_Date = today.ToString("MM/dd/yyyy");
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DFM Submited " + System.Environment.NewLine + findRecord.Genaral_Information;
            }

            if (DFMPAEChecked != null) // có att file
            {

                // Code luu file vào folder

                var fileExt = Path.GetExtension(DFMPAEChecked.FileName);
                var fileName = "DFM_PAEChecked_" + findRecord.Die_ID + today.ToString("yyyy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                DFMPAEChecked.SaveAs(path);


                findRecord.AttDFMPAEChecked = fileName;
                findRecord.DFM_PAE_Check_Date = today.ToString("MM/dd/yyyy");
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DFM Was Checked by PAE PIC " + System.Environment.NewLine + findRecord.Genaral_Information;


            }
            if (DFMPE1Checked != null) // có att file
            {
                var fileExt = Path.GetExtension(DFMPE1Checked.FileName);
                var fileName = "DFM_PE1Checked_" + findRecord.Die_ID + today.ToString("yyyy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                DFMPE1Checked.SaveAs(path);

                findRecord.AttDFMPE1Checked = fileName;
                findRecord.DFM_PE_Check_Date = today.ToString("MM/dd/yyyy");
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DFM Was Checked by PE1 PIC " + System.Environment.NewLine + findRecord.Genaral_Information;
            }
            if (DFMPE1App != null) // có att file
            {
                // Code luu file vào folder
                var fileExt = Path.GetExtension(DFMPE1App.FileName);
                var fileName = "DFM_PE1_App_" + findRecord.Die_ID + today.ToString("yyyy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                DFMPE1App.SaveAs(path);


                findRecord.AttDFMPE1App = fileName;
                findRecord.DFM_PE_App_Date = today.ToString("MM/dd/yyyy");
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DFM Was App by PE1 " + System.Environment.NewLine + findRecord.Genaral_Information;

            }
            if (DFMPAEApp != null) // có att file
            {
                // Code luu file vào folder
                var fileExt = Path.GetExtension(DFMPAEApp.FileName);
                var fileName = "DFM_PAE_Approved_" + findRecord.Die_ID + today.ToString("yyyy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                DFMPAEApp.SaveAs(path);

                findRecord.AttDFMPAEApp = fileName;
                findRecord.DFM_PAE_App_Date = today.ToString("MM/dd/yyyy");
                findRecord.Genaral_Information = today.ToString("MM/dd/yyyy") + ": DFM Was App by PAE " + System.Environment.NewLine + findRecord.Genaral_Information;

                Attachment newAtt = new Attachment
                {
                    RecordID = findRecord.RecordID,
                    FileName = findRecord.AttDFMPAEApp,
                    Clasify = "DFM",
                    CreatBy = "User",
                    CreateDate = today
                };
                db.Attachments.Add(newAtt);
                db.SaveChanges();
            }

            if (ToAttachment != null) // có att file
            {
                // Code luu file vào folder
                var fileExt = Path.GetExtension(ToAttachment.FileName);
                var fileName = "T0_Trial_Result_" + findRecord.Die_ID + today.ToString("yy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                ToAttachment.SaveAs(path);

                Attachment newAtt = new Attachment
                {
                    RecordID = findRecord.RecordID,
                    FileName = fileName,
                    Clasify = "Report",
                    CreatBy = "User",
                    CreateDate = today
                };
                db.Attachments.Add(newAtt);
                db.SaveChanges();
            }
            if (FAAttachment != null) // có att file
            {

                // Code luu file vào folder
                var fileExt = Path.GetExtension(ToAttachment.FileName);
                var fileName = "FA_Improvement_" + findRecord.Die_ID + today.ToString("yyyy-MM-dd-HHmmss") + fileExt;
                var path = Path.Combine(Server.MapPath("~/File/Attachment/"), fileName);
                FAAttachment.SaveAs(path);

                Attachment newAtt = new Attachment
                {
                    RecordID = findRecord.RecordID,
                    FileName = fileName,
                    Clasify = "Report",
                    CreatBy = "User",
                    CreateDate = today
                };
                db.Attachments.Add(newAtt);
                db.SaveChanges();
            }

            db.Entry(findRecord).State = EntityState.Modified;
            db.SaveChanges();
            List<Die_Launch_Management> result = new List<Die_Launch_Management>();
            result.Add(findRecord);
            status = true;
            var data = new
            {
                status = status,
                record = dataReturnView(result)
            };
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public Object dataReturnView(List<Die_Launch_Management> records)
        {
            var result = records.Select(x => new
            {
                RecordID = x.RecordID,
                Step = x.Step,
                Rank = x.Rank,
                Category = getCategory(x.Die_No),
                Part_No = x.Part_No,
                Part_name = x.Part_name,
                Process_Code = x.Process_Code,
                Die_No = x.Die_No,
                Die_ID = x.Die_ID,
                ModelID = x.ModelID,
                Model_Name = x.ModelID == null ? "Invalid" : db.ModelLists.Find(x.ModelID).ModelName,
                SupplierID = x.SupplierID,
                Supplier_Name = x.SupplierID == null ? "Invalid" : db.Suppliers.Find(x.SupplierID).SupplierName,
                Supplier_Code = x.SupplierID == null ? "Invalid" : db.Suppliers.Find(x.SupplierID).SupplierCode,
                Texture = x.Texture == null ? null : x.Texture == true ? "Yes" : "No",
                Status = getStatus(x),
                Pending_Status = getPendingAndDeptResponse(x).Pending_Status,
                Dept_Responsibility = getPendingAndDeptResponse(x).Dept_Respone,
                Progress = getPendingAndDeptResponse(x).Progress,
                Warning = getWarning(x),
                Genaral_Information = x.Genaral_Information,
                Decision_Date = x.Decision_Date,
                Select_Supplier_Date = x.Select_Supplier_Date,
                QTN_Sub_Date = x.QTN_Sub_Date,
                QTN_App_Date = x.QTN_App_Date,
                Need_Use_Date = x.Need_Use_Date,
                Target_OK_Date = x.Target_OK_Date.HasValue ? x.Target_OK_Date.Value.ToString("MM/dd/yyyy") : null,
                Inv_Idea = x.Inv_Idea,
                Inv_FB_To = x.Inv_FB_To,
                Inv_Result = x.Inv_Result,
                Inv_Cost_Down = x.Inv_Cost_Down,
                DFM_Sub_Date = x.DFM_Sub_Date,
                DFM_PAE_Check_Date = x.DFM_PAE_Check_Date,
                DFM_PE_Check_Date = x.DFM_PE_Check_Date,
                DFM_PE_App_Date = x.DFM_PE_App_Date,
                DFM_PAE_App_Date = x.DFM_PAE_App_Date,
                DFMMaker = x.AttDFMMaker,
                DFMPAEChecked = x.AttDFMPAEChecked,
                DFMPE1Checked = x.AttDFMPE1Checked,
                DFMPE1App = x.AttDFMPE1App,
                DFMPAEApp = x.AttDFMPAEApp,
                Die_Mat = x.Die_Mat,
                Slider_Mat = x.Slider_Mat,
                Lifter_Mat = x.Lifter_Mat,
                Hot_runner = x.Hot_runner,
                Gate = x.Gate,
                MC_Size = x.MC_Size,
                Cav_Qty = x.Cav_Qty,
                Die_Made_Location = x.Die_Made_Location,
                Die_Maker = x.Die_Maker,
                Family_Die_With = x.Family_Die_With,
                Common_Part_With = x.Common_Part_With,
                Die_Special = x.Die_Special,
                DSUM_Idea = x.DSUM_Idea,
                MR_Request_Date = x.MR_Request_Date.HasValue ? x.MR_Request_Date.Value.ToString("MM/dd/yyyy") : null,
                MR_App_Date = x.MR_App_Date.HasValue ? x.MR_App_Date.Value.ToString("MM/dd/yyyy") : null,
                PO_Issue_Date = x.PO_Issue_Date.HasValue ? x.PO_Issue_Date.Value.ToString("MM/dd/yyyy") : null,
                PO_App_Date = x.PO_App_Date.HasValue ? x.PO_Issue_Date.Value.ToString("MM/dd/yyyy") : null,
                Design_Check_Plan = x.Design_Check_Plan,
                Design_Check_Actual = x.Design_Check_Actual,
                Design_Check_Result = x.Design_Check_Result,
                NoOfPoit_Not_FL_DMF = x.NoOfPoit_Not_FL_DMF,
                NoOfPoint_Not_FL_Spec = x.NoOfPoint_Not_FL_Spec,
                NoOfPoint_Kaizen = x.NoOfPoint_Kaizen,
                JIG_Using = x.JIG_Using == null ? null : x.JIG_Using == true ? "Yes" : "No",
                JIG_No = x.JIG_No,
                JIG_Check_Plan = x.JIG_Check_Plan,
                JIG_Check_Result = x.JIG_Check_Result,
                JIG_ETA_Supplier = x.JIG_ETA_Supplier,
                JIG_Status = x.JIG_Status,
                T0_Plan = x.T0_Plan.HasValue ? x.T0_Plan.Value.ToString("MM/dd/yyyy") : null,
                T0_Actual = x.T0_Actual.HasValue ? x.T0_Actual.Value.ToString("MM/dd/yyyy") : null,
                T0_Result = x.T0_Result,
                T0_Solve_Method = x.T0_Solve_Method,
                T0_Solve_Result = x.T0_Solve_Result,
                Texture_Meeting_Date = x.Texture_Meeting_Date,
                Texture_Go_Date = x.Texture_Go_Date,
                S0_Plan = x.S0_Plan.HasValue ? x.S0_Plan.Value.ToString("MM/dd/yyyy") : null,
                S0_Result = x.S0_Result,
                S0_Solve_Method = x.S0_Solve_Method,
                S0_solve_Result = x.S0_solve_Result,
                Texture_App_Date = x.Texture_App_Date,
                Texture_Internal_App_Result = x.Texture_Internal_App_Result,
                Texture_JP_HP_App_Result = x.Texture_JP_HP_App_Result,
                Texture_Note = x.Texture_Note,
                PreKK_Plan = x.PreKK_Plan,
                PreKK_Actual = x.PreKK_Actual,
                PreKK_Result = x.PreKK_Result,
                FA_Sub_Time = (x.FA_Sub_Time == null || x.FA_Sub_Time == 0) ? 0 : x.FA_Sub_Time - 1,
                FA_Plan = x.FA_Plan.HasValue ? x.FA_Plan.Value.ToString("MM/dd/yyyy") : null,
                FA_Result = x.FA_Result,
                FA_Result_Date = x.FA_Result_Date,
                FA_Problem = x.FA_Problem,
                FA_Action_Improve = x.FA_Action_Improve,
                MT1_Date = x.MT1_Date,
                MT1_Gather_Date = x.MT1_Gather_Date,
                MT1_Problem = x.MT1_Problem,
                MT1_Remark = x.MT1_Remark,
                MTF_Date = x.MTF_Date,
                MTF_Gather_Date = x.MTF_Gather_Date,
                MTF_Problem = x.MTF_Problem,
                MTF_Remark = x.MTF_Remark,
                TVP_No = x.TVP_No,
                ERI_No = x.ERI_No,
                TVP_Result = x.TVP_Result,
                TVP_Result_Date = x.TVP_Result_Date,
                TVP_Remark = x.TVP_Remark,
                PCAR_Date = x.PCAR_Date,
                PCAR_Result = x.PCAR_Result,
                First_Lot_Date = x.First_Lot_Date,
                Latest_Update_By = x.Latest_Update_By,
                Latest_Update_Date = x.Latest_Update_Date.HasValue ? x.Latest_Update_Date.Value.ToString("MM/dd/yyyy") : null,
                His_Update = x.His_Update,
                Latest_Pending_Status_Changed = x.Latest_Pending_Status_Changed.HasValue ? x.Latest_Pending_Status_Changed.Value.ToString("MM/dd/yyyy") : null,
                isCancel = x.isCancel,
                isClosed = x.isClosed,
                isActive = x.isActive,
                Attachment = db.Attachments.AsNoTracking().Where(y => y.RecordID == x.RecordID).ToList()
            });

            return result;
        }


























        // GET: Die_Launch_Management/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Die_Launch_Management Die_Launch_Management = db.Die_Launch_Management.Find(id);
            if (Die_Launch_Management == null)
            {
                return HttpNotFound();
            }
            return View(Die_Launch_Management);
        }

        // GET: Die_Launch_Management/Create
        public ActionResult Create()
        {
            ViewBag.ModelID = new SelectList(db.ModelLists, "ModelID", "ModelName");
            ViewBag.SupplierID = new SelectList(db.Suppliers, "SupplierID", "SupplierCode");
            return View();
        }

        // POST: Die_Launch_Management/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "RecordID,Step,Rank,Part_No,Part_name,Process_Code,Die_No,Die_ID,ModelID,SupplierID,Texture,Genaral_Information,Decision_Date,Select_Supplier_Date,QTN_Sub_Date,QTN_App_Date,Need_Use_Date,Target_OK_Date,Inv_Idea,Inv_FB_To,Inv_Result,Inv_Cost_Down,DFM_Sub_Date,DFM_PAE_Check_Date,DFM_PE_Check_Date,DFM_PE_App_Date,DFM_PAE_App_Date,Die_Mat,Slider_Mat,Lifter_Mat,Hot_runner,Gate,MC_Size,Cav_Qty,Die_Made_Location,Die_Maker,Family_Die_With,Common_Part_With,Die_Special,DSUM_Idea,MR_Request_Date,MR_App_Date,PO_Issue_Date,PO_App_Date,Design_Check_Plan,Design_Check_Actual,Design_Check_Result,NoOfPoit_Not_FL_DMF,NoOfPoint_Not_FL_Spec,NoOfPoint_Kaizen,JIG_Using,JIG_No,JIG_Check_Plan,JIG_Check_Result,JIG_ETA_Supplier,JIG_Status,T0_Plan,T0_Actual,T0_Result,T0_Solve_Method,T0_Solve_Result,Texture_Meeting_Date,Texture_Go_Date,S0_Plan,S0_Result,S0_Solve_Method,S0_solve_Result,Texture_App_Date,Texture_Internal_App_Result,Texture_JP_HP_App_Result,Texture_Note,PreKK_Plan,PreKK_Actual,FA_Sub_Time,FA_Plan,FA_Result,FA_Result_Date,FA_Problem,FA_Action_Improve,MT1_Date,MT1_Gather_Date,MT1_Problem,MT1_Remark,MTF_Date,MTF_Gather_Date,MTF_Problem,MTF_Remark,TVP_No,ERI_No,TVP_Result_Date,TVP_Remark,PCAR_Date,PCAR_Result,First_Lot_Date,Latest_Update_By,Latest_Update_Date,His_Update,Latest_Pending_Status_Changed,isCancel,isClosed,isActive")] Die_Launch_Management Die_Launch_Management)
        {
            if (ModelState.IsValid)
            {
                db.Die_Launch_Management.Add(Die_Launch_Management);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ModelID = new SelectList(db.ModelLists, "ModelID", "ModelName", Die_Launch_Management.ModelID);
            ViewBag.SupplierID = new SelectList(db.Suppliers, "SupplierID", "SupplierCode", Die_Launch_Management.SupplierID);
            return View(Die_Launch_Management);
        }

        // GET: Die_Launch_Management/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Die_Launch_Management Die_Launch_Management = db.Die_Launch_Management.Find(id);
            if (Die_Launch_Management == null)
            {
                return HttpNotFound();
            }
            ViewBag.ModelID = new SelectList(db.ModelLists, "ModelID", "ModelName", Die_Launch_Management.ModelID);
            ViewBag.SupplierID = new SelectList(db.Suppliers, "SupplierID", "SupplierCode", Die_Launch_Management.SupplierID);
            return View(Die_Launch_Management);
        }

        // POST: Die_Launch_Management/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "RecordID,Step,Rank,Part_No,Part_name,Process_Code,Die_No,Die_ID,ModelID,SupplierID,Texture,Genaral_Information,Decision_Date,Select_Supplier_Date,QTN_Sub_Date,QTN_App_Date,Need_Use_Date,Target_OK_Date,Inv_Idea,Inv_FB_To,Inv_Result,Inv_Cost_Down,DFM_Sub_Date,DFM_PAE_Check_Date,DFM_PE_Check_Date,DFM_PE_App_Date,DFM_PAE_App_Date,Die_Mat,Slider_Mat,Lifter_Mat,Hot_runner,Gate,MC_Size,Cav_Qty,Die_Made_Location,Die_Maker,Family_Die_With,Common_Part_With,Die_Special,DSUM_Idea,MR_Request_Date,MR_App_Date,PO_Issue_Date,PO_App_Date,Design_Check_Plan,Design_Check_Actual,Design_Check_Result,NoOfPoit_Not_FL_DMF,NoOfPoint_Not_FL_Spec,NoOfPoint_Kaizen,JIG_Using,JIG_No,JIG_Check_Plan,JIG_Check_Result,JIG_ETA_Supplier,JIG_Status,T0_Plan,T0_Actual,T0_Result,T0_Solve_Method,T0_Solve_Result,Texture_Meeting_Date,Texture_Go_Date,S0_Plan,S0_Result,S0_Solve_Method,S0_solve_Result,Texture_App_Date,Texture_Internal_App_Result,Texture_JP_HP_App_Result,Texture_Note,PreKK_Plan,PreKK_Actual,FA_Sub_Time,FA_Plan,FA_Result,FA_Result_Date,FA_Problem,FA_Action_Improve,MT1_Date,MT1_Gather_Date,MT1_Problem,MT1_Remark,MTF_Date,MTF_Gather_Date,MTF_Problem,MTF_Remark,TVP_No,ERI_No,TVP_Result_Date,TVP_Remark,PCAR_Date,PCAR_Result,First_Lot_Date,Latest_Update_By,Latest_Update_Date,His_Update,Latest_Pending_Status_Changed,isCancel,isClosed,isActive")] Die_Launch_Management Die_Launch_Management)
        {
            if (ModelState.IsValid)
            {
                db.Entry(Die_Launch_Management).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ModelID = new SelectList(db.ModelLists, "ModelID", "ModelName", Die_Launch_Management.ModelID);
            ViewBag.SupplierID = new SelectList(db.Suppliers, "SupplierID", "SupplierCode", Die_Launch_Management.SupplierID);
            return View(Die_Launch_Management);
        }

        // GET: Die_Launch_Management/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Die_Launch_Management Die_Launch_Management = db.Die_Launch_Management.Find(id);
            if (Die_Launch_Management == null)
            {
                return HttpNotFound();
            }
            return View(Die_Launch_Management);
        }

        // POST: Die_Launch_Management/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Die_Launch_Management Die_Launch_Management = db.Die_Launch_Management.Find(id);
            db.Die_Launch_Management.Remove(Die_Launch_Management);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
