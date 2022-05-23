using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using DMS.Models;

namespace DMS.Controllers
{
    public class Die_Launching_ControlController : Controller
    {
        private DMSEntities db = new DMSEntities();

        // GET: Die_Launching_Control
        public ActionResult Index()
        {
            var die_Launching_Control = db.Die_Launching_Control.Include(d => d.ModelList).Include(d => d.Supplier);
            ViewBag.headerColumn = db.Die_Launch_Column_Manage.ToList();
            ViewBag.ModelID = new SelectList(db.ModelLists, "ModelID", "ModelName");
            ViewBag.SupplierID = new SelectList(db.Suppliers, "SupplierID", "SupplierCode");
            return View(die_Launching_Control.ToList());
        }


        public JsonResult getRecord(string search, string[] model, string[] supplier, string following, string[] category, string[] FAresult, string from, string to)
        {
            db.Configuration.ProxyCreationEnabled = false;

            model = (model ?? new string[] { });
            supplier = (supplier ?? new string[] { });
            category = (category ?? new string[] { });
            FAresult = (FAresult ?? new string[] { });

            var records = db.Die_Launching_Control.Where(x => x.Active != false).Include(x => x.ModelList).Include(x => x.Supplier).ToList();

            if (!String.IsNullOrEmpty(search))
            {
                var searchResult = records.Where(x => x.Part_No.Contains(search.Trim())).ToList();
                if (searchResult.Count() == 0)
                {
                    searchResult = records.Where(x => x.Die_ID.Contains(search.Trim())).ToList();
                }
                if (searchResult.Count() == 0)
                {
                    searchResult = records.Where(x => x.Part_Name.Contains(search.Trim())).ToList();
                }
                records = searchResult;
            }
            if (model.Length > 0)
            {
                List<Die_Launching_Control> searchResult = new List<Die_Launching_Control>();
                foreach (var item in model)
                {
                    var result = records.Where(x => x.ModelID == Int32.Parse(item)).ToList();
                    searchResult.AddRange(result);
                }
                records = searchResult;
            }

            if (supplier.Length > 0)
            {
                List<Die_Launching_Control> searchResult = new List<Die_Launching_Control>();
                foreach (var item in supplier)
                {
                    var result = records.Where(x => x.SupplierID == Int32.Parse(item)).ToList();
                    searchResult.AddRange(result);
                }
                records = searchResult;
            }

            if (category.Length > 0)
            {
                List<Die_Launching_Control> searchResult = new List<Die_Launching_Control>();
                foreach (var item in category)
                {
                    if (item.ToLower().Contains("mt"))
                    {
                        var result = records.Where(x => isRenewOrAddOrMT(x.Die_No) == "MT" || isRenewOrAddOrMT(x.Die_No) == "Invalid").ToList();
                        searchResult.AddRange(result);
                    }
                    if (item.ToLower().Contains("renew"))
                    {
                        var result = records.Where(x => isRenewOrAddOrMT(x.Die_No) == "RN" || isRenewOrAddOrMT(x.Die_No) == "Invalid").ToList();
                        searchResult.AddRange(result);
                    }
                    if (item.ToLower().Contains("add"))
                    {
                        var result = records.Where(x => isRenewOrAddOrMT(x.Die_No) == "AD" || isRenewOrAddOrMT(x.Die_No) == "Invalid").ToList();
                        searchResult.AddRange(result);

                    }
                    if (item.ToLower().Contains("overhaul"))
                    {
                        var result = records.Where(x => isRenewOrAddOrMT(x.Die_No) == "OH" || isRenewOrAddOrMT(x.Die_No) == "Invalid").ToList();
                        searchResult.AddRange(result);

                    }
                }
                records = searchResult;
            }

            if (FAresult.Length > 0)
            {
                List<Die_Launching_Control> searchResult = new List<Die_Launching_Control>();
                foreach (var item in FAresult)
                {
                    var result = records.Where(x => x.FA_Result == item).ToList();
                    searchResult.AddRange(result);
                }
                records = searchResult;
            }

            if (!String.IsNullOrEmpty(following))
            {
                List<Die_Launching_Control> searchResult = new List<Die_Launching_Control>();
                int fl = Int32.Parse(following);
                switch (fl)
                {
                    case 1: // isFollowing
                        searchResult = records.Where(x => x.Following != false).ToList();
                        records = searchResult;
                        break;
                    case 0: // isClose
                        searchResult = records.Where(x => x.Following == false).ToList();
                        records = searchResult;
                        break;
                    case -1: // all

                        break;
                }
            }
            else // luc load page luon chi lay record dang follow
            {
                var searchResult = records.Where(x => x.Following != false).ToList();
                records = searchResult;
            }

            if (!String.IsNullOrEmpty(from))
            {
                var searchResult = records.Where(x => x.Issue_Date >= Convert.ToDateTime(from)).ToList();
                records = searchResult;
            }
            if (!String.IsNullOrEmpty(to))
            {
                var searchResult = records.Where(x => x.Issue_Date <= Convert.ToDateTime(to)).ToList();
                records = searchResult;
            }

            var data = records.AsEnumerable().Select(x => new
            {
                RecordID = x.RecordID,
                Category = x.Category,
                Step = x.Step,
                Rank = x.Rank,
                Part_No = x.Part_No,
                Part_Name = x.Part_Name,
                Process_Code = x.Process_Code,
                Die_No = x.Die_No,
                Die_ID = x.Die_ID,
                Model_Name = x.ModelID != null ? x.ModelList.ModelName : "",
                Supplier = x.SupplierID != null ? String.Concat(x.Supplier.SupplierCode, "-", x.Supplier.SupplierName) : "",
                Progress = "", // Để trống
                Status = "",// Để trống
                Pending_Status = "", // Để trống
                Dept_Response = "", // Để trống
                Warning = "", // Để trống
                Genaral_Information = x.Genaral_Infomation,
                Decision_Date = x.Decision_Date, // data kieu string
                Select_Supplier_Date = x.Select_Supplier_Date, // data kieu string
                QTN_Sub_Date = x.QTN_Sub_Date,
                QTN_App_Date = x.QTN_App_Date,
                Need_Using_Date = x.Need_Using_Date, // Tạo database kiểu Date
                Target_OK_Date = x.Target_OK_Date,
                Inv_Idea = x.Inv_Idea,
                Inv_Feedback_To = x.Inv_FB_To,
                Inv_Result = x.Inv_Result,
                Inv_Cost_Down = x.Inv_Cost_Down,
                DFM_Sub_Date = x.DFM_Sub_Date, // data kieu string
                DFM_PAE_Check_Date = x.DFM_PAE_Check_Date, // data kieu string
                DFM_PE1_Check_Date = x.DFM_PE1_Check_Date, // data kieu string
                DFM_PE1_App_Date = x.DFM_PE1_App_Date, // data kieu string
                DFM_PAE_App_Date = x.DFM_PAE_App_Date, // data kieu string
                Core_Cav_Mat = x.Core_Cav_Mat,
                Slider_Mat = x.Slider_Mat,
                Lifter_Mat = x.Lifter_Mat,
                Texture = x.Texture == true ? "Yes" : "No",
                Hot_Runner = x.Hot_Runner,
                Gate = x.Gate,
                MC_Size = x.MC_Size,
                Die_Make_Location = x.Die_Make_Location,
                Die_Maker = x.Die_Maker,
                Family_Die_With = x.Family_Die_With,
                Common_Part_With = x.Common_Part_With,
                Special_Die = x.Special_Die,
                DSUM_Idea = x.DSUM_Idea,
                DSUM_Idea_Cost_Down = x.DSUM_Idea_Cost_Down,
                MR_Request_Date = x.MR_Request_Date.HasValue ? x.MR_Request_Date.Value.ToString("yyyy-MM-dd") : null,//Kieu data time
                MR_App_Date = x.MR_App_Date.HasValue ? x.MR_App_Date.Value.ToString("yyyy-MM-dd") : null, //Kieu data time
                PO_Issue_Date = x.PO_Issue_Date.HasValue ? x.PO_Issue_Date.Value.ToString("yyyy-MM-dd") : null, //Kieu data time
                PO_App_Date = x.PO_App_Date.HasValue ? x.PO_App_Date.Value.ToString("yyyy-MM-dd") : null,
                JIG_Using_Status = x.JIG_Using_Status,
                JIG_No = x.JIG_No,
                JIG_Check_Plan = x.JIG_Check_Plan,
                JIG_Check_Result = x.JIG_Check_Result,
                JIG_ETA_Supplier = x.JIG_ETA_Supplier,
                JIG_Status = x.JIG_Status,
                T0_Plan = x.T0_Plan.HasValue ? x.T0_Plan.Value.ToString("yyyy-MM-dd") : null,
                T0_Actual = x.T0_Actual.HasValue ? x.T0_Actual.Value.ToString("yyyy-MM-dd") : null,
                T0_Try_Result = x.T0_Try_Result,
                T0_Solving_Method = x.T0_Solving_Method,
                T0_Solving_Result = x.T0_Solving_Result,
                Tn_Try_Time = x.Tn_Try_Time,
                Tn_Plan = x.Tn_Plan.HasValue ? x.Tn_Plan.Value.ToString("yyyy-MM-dd") : null,
                Tn_Actual = x.Tn_Actual.HasValue ? x.Tn_Actual.Value.ToString("yyyy-MM-dd") : null,
                Tn_Try_Result = x.Tn_Try_Result,
                Tn_Solving_Method = x.Tn_Solving_Method,
                Tn_Solving_Result = x.Tn_Solving_Result,
                Texture_Meeting_Date = x.Texture_Meeting_Date, // data kieu string
                Texture_Go_Date = x.Texture_Go_Date, // data kieu string
                S0_Plan = x.S0_Plan.HasValue ? x.S0_Plan.Value.ToString("yyyy-MM-dd") : null,
                S0_Actual = x.S0_Actual.HasValue ? x.S0_Actual.Value.ToString("yyyy-MM-dd") : null,
                S0_Result = x.S0_Result,
                S0_Solving_Method = x.S0_Solving_Method,
                S0_Solving_Result = x.S0_Solving_Result,
                Sn_Try_Time = x.Sn_Try_Time,
                Sn_Plan = x.Sn_Plan.HasValue ? x.Sn_Plan.Value.ToString("yyyy-MM-dd") : null,
                Sn_Actual = x.Sn_Actual.HasValue ? x.Sn_Actual.Value.ToString("yyyy-MM-dd") : null,
                Sn_Result = x.Sn_Result,
                Sn_Solving_Method = x.Sn_Solving_Method,
                Sn_Solving_Result = x.Sn_Solvig_Result,
                Texture_App_Date = x.Texture_App_Date,
                Texture_Internal_App_Result = x.Texture_Internal_App_Result,
                Texture_JP_HP_App_Result = x.Texture_JP_HP_App_Result,
                Texture_Note = x.Texture_Note,
                FA_Sub_Time = x.FA_Sub_Time,
                FA_Plan = x.FA_Plan.HasValue ? x.FA_Plan.Value.ToString("yyyy-MM-dd") : null,
                FA_Actual = x.FA_Actual.HasValue ? x.FA_Actual.Value.ToString("yyyy-MM-dd") : null,
                FA_Result = x.FA_Result,
                FA_Problem = x.FA_Problem,
                FA_Action_Improve = x.FA_Action_Improve,
                MT1_Date = x.MT1_Date,
                MT1_Gather_Date = x.MT1_Gather_Date,
                MT1_Problem = x.MT1_Problem,
                MT1_Solve_Method = x.MT1_Solve_Method,
                MT1_Solve_Result = x.MT1_Solve_Result,
                MT1_Remark = x.MT1_Remark,
                MTF_Date = x.MTF_Date,
                MTF_Gether_Date = x.MTF_Gether_Date,
                MTF_Problem = x.MTF_Problem,
                MTF_Solve_Method = x.MTF_Solve_Method,
                MTF_Solve_Result = x.MTF_Solve_Result,
                MTF_Remark = x.MTF_Remark,
                TVP_Date = x.TVP_Date, // Kiêu string
                TVP_No = x.TVP_No,
                TVP_Result = x.TVP_Result,
                TVP_Remark = x.TVP_Remark,
                PCAR_Date = x.PCAR_Date,
                PCAR_Result = x.PCAR_Result,
                First_Lost_Date = x.First_Lost_Date,// kieu string
                PAE_PIC = x.PAE_PIC,
                PE1_PIC = x.PE1_PIC,
                MQA_PIC = x.MQA_PIC,
                PUR_PIC = x.PUR_PIC,
                PDC_PIC = x.PDC_PIC,
                Latest_Update = x.Lastest_Update_Date.HasValue ? x.Lastest_Update_Date.Value.ToString("yyyy-MM-dd") : null,
                Latest_Update_By = x.Latest_Update_By,
                His_Update = x.His_Update,
                Issue_Date = x.Issue_Date.HasValue ? x.Issue_Date.Value.ToString("yyyy-MM-dd") : null,
                Issue_By = x.Issue_By,

            }).ToList();


            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveRecord(int recordID, string name, string newValue)
        {
            var status = false;
            var record = db.Die_Launching_Control.Find(recordID);
            var a = "";
            try
            {
                PropertyInfo[] targetProps = record.GetType()
               .GetProperties(BindingFlags.Instance | BindingFlags.Public | BindingFlags.SetProperty);


                var targetProp = targetProps.FirstOrDefault(y => y.Name == name);
                a = targetProp.ToString();
                if (targetProp != null)
                {
                    targetProp.SetValue(record, newValue);
                    status = true;
                    db.Entry(record).State = EntityState.Modified;
                    db.SaveChanges();
                }
                else
                {
                    status = true;
                }

            }
            catch
            {
                status = false;
            }

            var data = new
            {
                status = status,
                recordID = recordID,
                name = name,
                newValue = newValue,
                a = a
            };

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getMakers()
        {
            var data = db.Suppliers.Select(x => new
            {
                value = x.SupplierID,
                show = x.SupplierCode + "-" + x.SupplierName

            });
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public string isRenewOrAddOrMT(string DieNo)
        {
            var result = ""; // >> MT || RN || AD || OH || Invalid
            var dieNo = DieNo.Trim();
            var fistLetter = dieNo[0];
            var seccondLetter = dieNo[1];
            if (dieNo.Length == 3)
            {
                if (seccondLetter == '4')
                {
                    result = "RN";
                }
                else
                {
                    if (seccondLetter == '6')
                    {
                        result = "OH";
                    }
                    else
                    {
                        if (seccondLetter == '1')
                        {
                            if (fistLetter == '1')
                            {
                                result = "MT";
                            }
                            else
                            {
                                result = "AD";
                            }
                        }
                        else
                        {
                            result = "Invalid";
                        }
                    }
                }
            }
            else
            {
                result = "Invalid";
            }
            return result;
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
