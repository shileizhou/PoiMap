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
                        cmd.Parameters.AddWithValue("@Address", InputPoi.Address);
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
                        cmd.Parameters.AddWithValue("@ARPhoto", InputPoi.ARPhoto);
                        cmd.Parameters.AddWithValue("@Website", InputPoi.Website);

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

        public string UpdatePoi(Pois InputPoi)
        {
            try
            {
                using (var connection = new SqlConnection(
                                          "Server=tcp:livemap.database.windows.net,1433;Database=livemap;User ID=livemap@livemap;Password=Zhuzhu88;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
                {
                    connection.Open();

                    using (SqlCommand cmd = new SqlCommand("UpdatePoi", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@PlaceId", InputPoi.PlaceId);
                        cmd.Parameters.AddWithValue("@PlaceName", InputPoi.PlaceName);
                        cmd.Parameters.AddWithValue("@Address", InputPoi.Address);
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
                        cmd.Parameters.AddWithValue("@ARPhoto", InputPoi.ARPhoto);
                        cmd.Parameters.AddWithValue("@Website", InputPoi.Website);

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


        public Pois GetPoi(string inPlaceid)
        {
            Pois oPois = new Pois();

            try
            {
                using (var connection = new SqlConnection(
                      "Server=tcp:livemap.database.windows.net,1433;Database=livemap;User ID=livemap@livemap;Password=Zhuzhu88;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
                {
                    connection.Open();

                    using (SqlCommand cmd = new SqlCommand("SelectPoiById", connection))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@PlaceId", inPlaceid);

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                oPois.PlaceName = dr["PlaceName"].ToString();
                                oPois.Address = dr["Address"].ToString();
                                oPois.Country = dr["Country"].ToString();
                                oPois.Description = dr["Description"].ToString();
                                oPois.Longtitude = (decimal)dr["Longtitude"];
                                oPois.Latitude = (decimal)dr["Latitude"];
                                oPois.Altitude = (decimal)dr["Altitude"];
                                oPois.Icon = dr["Icon"].ToString();
                                oPois.MainPhoto = dr["MainPhoto"].ToString();
                                oPois.Wiki = dr["Wiki"].ToString();
                                oPois.ARName = dr["ARName"].ToString();
                                oPois.ARPhoto = dr["ARPhoto"].ToString();
                                oPois.Website = dr["Website"].ToString();
                                return oPois;
                            }
                            else
                            {
                                return null;
                            }
                        }
                    }

                }
            }
            catch (System.Exception ex)
            {
                return null;
            }

        }

    }
    public class Pois
    {
        public string PlaceId { get; set; }
        public string PlaceName { get; set; }
        public string Address { get; set; }
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

        public Pois()
        {
            PlaceId = "";
            PlaceName = "";
            Address = "";
            Country = "";
            Description = "";
            Longtitude = 0;
            Latitude = 0;
            Altitude = 0;
            Icon = "";
            MainPhoto = "";
            Video = "";
            Wiki = "";
            ARName = "";
            ARPhoto = "";
            Website = "";
        }
    }

}
