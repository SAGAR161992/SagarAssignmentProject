using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Reslt
    {
        public Int32 RETURNCODE { get; set; }
    }
    public class ModelUsersVehicle
    {
        public Int32 UserID { get; set; }
        public string Name { get; set; }
        public Int64 MobileNo { get; set; }
        public string Organization { get; set; }
        public string Address { get; set; }
        public string EmailAddress { get; set; }
        public string Location { get; set; }

        public string VehicleNo { get; set; }
        public string VehicleType { get; set; }
        public string ChassisNo { get; set; }
        public string EngineNo { get; set; }
        public int ManufacturerYear { get; set; }
        public int LoadCarryingCapacity { get; set; }
        public string MakeOfVehicle { get; set; }
        public string ModelNo { get; set; }
        public string BodyType { get; set; }
        public string OrganizationName { get; set; }
        public Int64 DeviceID { get; set; }
    }
}