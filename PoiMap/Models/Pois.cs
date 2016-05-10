using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;  // System.Data.dll
using System.Data;

namespace PoiMap.Models
{

    public class PoisOps
    {
        public string InsertPoi(Pois InputPoi)
        {
            try
            {
                using (var connection = new SqlConnection(
                                          "Server=tcp:livemap.database.windows.net,1433;Database=livemap;User ID=livemap@livemap;Password=Zhuzhu88;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
                {
                    connection.Open();

                    using (SqlCommand cmd = new SqlCommand("AddPoi", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@PlaceId", InputPoi.PlaceId);
                        cmd.Parameters.AddWithValue("@PlaceName", InputPoi.PlaceName);
                        cmd.Parameters.AddWithValue("@City", InputPoi.City);
                        cmd.Parameters.AddWithValue("@Country", InputPoi.Country);
                        cmd.Parameters.AddWithValue("@Description", InputPoi.Description);
                        cmd.Parameters.AddWithValue("@Longtitude", InputPoi.Longtitude);
                        cmd.Parameters.AddWithValue("@Latitude", InputPoi.Latitude);
                        cmd.Parameters.AddWithValue("@Altitude", InputPoi.Altitude);
                        cmd.Parameters.AddWithValue("@Icon", InputPoi.Icon);
                        cmd.Parameters.AddWithValue("@MainPhoto", InputPoi.MainPhoto);
                        cmd.Parameters.AddWithValue("@Video", InputPoi.Video);
                        cmd.Parameters.AddWithValue("@Wiki", InputPoi.Wiki);
                        cmd.Parameters.AddWithValue("@ARName", InputPoi.ARName);

                        cmd.ExecuteNonQuery();

                    }

                }
            }
            catch (System.Exception ex)
            {
                return ex.Message;
            }

            return "Success";
        }

    }
    public class Pois
    {
        public string PlaceId { get; set; }
        public string PlaceName { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public decimal Longtitude { get; set; }
        public decimal Latitude { get; set; }
        public decimal Altitude { get; set; }
        public string Icon { get; set; }
        public string MainPhoto { get; set; }
        public string Video { get; set; }
        public string Wiki { get; set; }
        public string ARName { get; set; }
        public string ARPhoto { get; set; }
        public string Website { get; set; }

    }

}
