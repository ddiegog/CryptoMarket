namespace CryptoMarket_API.ApiResponse
{
    public class ApiResponse<T>
    {
        public string Error { get; set; }
        public T Data { get; set; }
    }

}
