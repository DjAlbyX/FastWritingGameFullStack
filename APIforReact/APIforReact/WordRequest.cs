using System.Text.Json.Serialization;

namespace APIforReact
{
    public class WordRequest
    {
        [JsonInclude]
        private string Word { get; set; }
        public WordRequest(string word) { Word = word; }
        public string GetWord() => Word; 
    }
}
