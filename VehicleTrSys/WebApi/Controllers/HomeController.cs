using DataAccess;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using WebApi.Models;

//using WebApi.Models;

namespace WebApi.Controllers
{
    public class HomeController : Controller
    {
       
        public ActionResult GetUserVehicleInfo()
        {
            object[] args = new object[] { };
            DataCon con = new DataCon();
            List<ModelUsersVehicle> UserInfo = con.ExecuteStoredProcedure<ModelUsersVehicle>("Usp_GetUserVehicleInfo", "Proc", args).ToList();
            con.Dispose();
            return Json(UserInfo, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ActionUserVehicleUserVehicleInfo(string Details)
        {
            XmlDocument xmlparameter = new XmlDocument();
            xmlparameter.LoadXml(Details);

            string Action = xmlparameter.SelectSingleNode("XMLElement/Action").InnerText.Trim();
            Int32 UserID;
            Int64 MobileNo;
            Int16 ManufacturerYear;
            Int16 LoadCarryingCapacity;
            Int64 DeviceID;
            if (Action == "U")
            {
                UserID = Convert.ToInt32(xmlparameter.SelectSingleNode("XMLElement/UserID").InnerText.Trim());
              
            }
            else
            {
                UserID = 0;
            }

            MobileNo = Convert.ToInt64(xmlparameter.SelectSingleNode("XMLElement/MobileNo").InnerText.Trim());
            ManufacturerYear = Convert.ToInt16(xmlparameter.SelectSingleNode("XMLElement/ManufacturerYear").InnerText.Trim());
            LoadCarryingCapacity = Convert.ToInt16(xmlparameter.SelectSingleNode("XMLElement/LoadCarryingCapacity").InnerText.Trim());
            DeviceID = Convert.ToInt64(xmlparameter.SelectSingleNode("XMLElement/DeviceID").InnerText.Trim());

            string Name = xmlparameter.SelectSingleNode("XMLElement/Name").InnerText.Trim();
            string Organization = xmlparameter.SelectSingleNode("XMLElement/Organization").InnerText.Trim();
            string Address = xmlparameter.SelectSingleNode("XMLElement/Address").InnerText.Trim();
            string EmailAddress = xmlparameter.SelectSingleNode("XMLElement/EmailAddress").InnerText.Trim();
            string Location = xmlparameter.SelectSingleNode("XMLElement/Location").InnerText.Trim();
            string VehicleNo = xmlparameter.SelectSingleNode("XMLElement/VehicleNo").InnerText.Trim();
            string VehicleType = xmlparameter.SelectSingleNode("XMLElement/VehicleType").InnerText.Trim();
            string ChassisNo = xmlparameter.SelectSingleNode("XMLElement/ChassisNo").InnerText.Trim();

            string EngineNo = xmlparameter.SelectSingleNode("XMLElement/EngineNo").InnerText.Trim();
            string MakeOfVehicle = xmlparameter.SelectSingleNode("XMLElement/MakeOfVehicle").InnerText.Trim();
            string ModelNo = xmlparameter.SelectSingleNode("XMLElement/ModelNo").InnerText.Trim();
            string BodyType = xmlparameter.SelectSingleNode("XMLElement/BodyType").InnerText.Trim();

            string OrganizationName = xmlparameter.SelectSingleNode("XMLElement/OrganizationName").InnerText.Trim();

            object[] args = new object[] { Action, UserID, Name, MobileNo, Organization, Address, EmailAddress, Location, VehicleNo, VehicleType, ChassisNo, EngineNo, ManufacturerYear, LoadCarryingCapacity, MakeOfVehicle, ModelNo, BodyType, OrganizationName, DeviceID };
            DataCon con = new DataCon();
            Reslt Res = con.ExecuteStoredProcedure<Reslt>("Usp_ActionUserVehicle", "Proc", args).FirstOrDefault();
            con.Dispose();
            return Json(Res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetVehicleNoCheck(string VehicleNo)
        {
            object[] args = new object[] { VehicleNo };
            DataCon con = new DataCon();
            Reslt Res = con.ExecuteStoredProcedure<Reslt>("Usp_GetVehicleNoCheck", "Proc", args).FirstOrDefault();
            con.Dispose();
            return Json(Res, JsonRequestBehavior.AllowGet);
        }
    }
}
