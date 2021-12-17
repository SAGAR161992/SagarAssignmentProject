using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class mydemocon : DbContext
    {
        static mydemocon()
        {
            Database.SetInitializer<mydemocon>(new CreateDatabaseIfNotExists<mydemocon>());
        }

        public mydemocon() : base("name=mydemocon") { }


    }
    public class DataConSql
    {
        public SqlConnection GetConnection()
        {
            string cnstr = ConfigurationManager.ConnectionStrings["mydemocon"].ConnectionString;
            SqlConnection cn = new SqlConnection(cnstr);
            cn.Open();
            return cn;
        }
    }



   

}

