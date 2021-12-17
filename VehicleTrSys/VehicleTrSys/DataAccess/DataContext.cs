using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class DataCon : IDisposable
    {

        mydemocon context;

        //string mycn;

        //public DataCon(string conn)
        //{
        //    mycn = conn;
        //}

        public System.Data.Entity.Infrastructure.DbRawSqlQuery<TEntity> ExecuteStoredProcedure<TEntity>(string sqlProcedure, string commndtype,
                                                                                                        params object[] parameters)
        {

            try
            {
                context = new mydemocon();//MyCon


                string storedProcedureComm = "";
                if (context != null)
                {
                    if (commndtype != "Query")
                    {
                        storedProcedureComm = "Execute " + sqlProcedure + " ";
                        List<object> argumentParam = parameters.ToList();

                        SqlParameter[] queryParams;
                        storedProcedureComm = addParameters(storedProcedureComm, argumentParam, out queryParams);
                        //storedProcedureComm += ";";

                    }
                    else
                    {
                        storedProcedureComm = sqlProcedure;

                    }
                    var q = context.Database.SqlQuery<TEntity>(storedProcedureComm, parameters);

                    return q;
                }
                else
                {
                    throw new NullReferenceException();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //context.Dispose();
                parameters = null;
            }
        }
        public string addParameters(string sqlProcedureCommand, List<object> argumentParam, out SqlParameter[] queryParam)
        {
            try
            {
                string paramName = "";
                queryParam = new SqlParameter[argumentParam.Count()];

                for (int i = 0; i < argumentParam.Count(); i++)
                {
                    paramName = "p" + i;
                    queryParam[i] = new SqlParameter(paramName, argumentParam[i]);
                    sqlProcedureCommand += "@" + paramName;

                    if (i < argumentParam.Count - 1)
                    {
                        sqlProcedureCommand += ",";
                    }
                }

                return sqlProcedureCommand;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void Dispose()
        {
            context.Dispose();
        }

        public string GetOTP(string MemberID)
        {
            try
            {
                DataSet ds = new DataSet();
                DataSet dsRet = new DataSet();
                string cs = ConfigurationManager.ConnectionStrings["mydemocon"].ConnectionString;
                SqlConnection con = new SqlConnection(cs);
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = con;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "Usp_GetOTPAndroid3333333333";
                SqlParameter parUsername = new SqlParameter("@Action", 3);
                SqlParameter parPassword = new SqlParameter("@MemberID", MemberID);
                con.Open();
                string Returncode = cmd.ExecuteNonQuery().ToString();
                con.Close();
                return Returncode;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
