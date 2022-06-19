//* buton üzerinden yakalamak yerine form submit eventi ile yakalıcam. aslında aynı şey, ama entera basınca buton kullanırsak ek kod kullanmamız gerekecekti. bunda gerekmiyor, input içinde yazıyı otomatik silmek için ek kod yazmak gerekiyordu. form da gerekmiyor
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".msg");
const list = document.querySelector(".ajax-section .cities");

//* yazdığım api tokenını şifreleme algoritmasına sokup şifreli yazdırdım.Encrprt kısmını hoca direkt verdi.
//! local storage a attığım için artık durmasına gerek yok. sildik
// localStorage.setItem(
//   "apiKey",
//   EncryptStringAES("4d8fb5b93d4af21d66a2948710284366")
// );

form.addEventListener("submit", (e) => {
  //? form submit edildiğinde default olarak sayfa kendini yeniliyor. bunu önlemek için yazdık
  e.preventDefault();
  //butonu,formu submit ettiğimde apiye istek atıp,inputtaki değere göre değerleri getirip,html ile bastırıcam
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  let tokenKey = DecryptStringAES(localStorage.getItem("apiKey"));
  let inputVal = input.value;
  let unitType = "metric";
  let lang = "tr";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${tokenKey}&units=${unitType}&lang=${lang}`;

  try {
    //? fetch ile kullanımı
    // const response = await fetch(url).then((response) => response.json());
    //? axios ile kullanımı
    //! veriyi çektim
    const response = await axios(url);
    const { name, main, sys, weather } = response.data;
    let iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  } catch (error) {}

  //! ne kadar input olursa olsun,form altındaki bütün inputların içini siler
  form.reset();
};
