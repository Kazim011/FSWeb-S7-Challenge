import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import * as yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert } from "reactstrap";
import "./order.css";
import Header from "./Header";
import pizza from "./image/pizza-1200x480.jpg";

const dummyData = {
  pizzaTur: "",
  pizzaKenar: "",
  pizzaBoyut: "",
  ekMalzeme: [],
  not: "",
  name: "",
  adres: "",
  tel: "",
  siparisAdet: 0,
};

const dummyDataErrors = {
  pizzaTur: "",
  pizzaKenar: "",
  pizzaBoyut: "",
  not: "",
  name: "",
  adres: "",
  tel: "",
  siparisAdet: "",
};

const dummySiparisData = {
  id: "",
  createdAt: "",
  pizzaTur: "",
  pizzaKenar: "",
  pizzaBoyut: "",
  ekMalzeme: [],
  not: "",
  name: "",
  adres: "",
  tel: "",
  siparisAdet: "",
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "must be a minimum of 2 characters")
    .required("please enter your name"),

  adres: yup
    .string()
    .min(5, "address must be at least 5 characters")
    .required("please fill in the address part"),

  tel: yup
    .number()
    .typeError("please must be number")
    .min(10, "phone number must be a minimum of 10 digits")
    .required("please enter your phone number."),

  not: yup.string(),

  siparisAdet: yup
    .number()
    .min(1, "Order quantity must be at least 1 piece")
    .typeError("please must be number")
    .required("please select the order quantity"),

  pizzaTur: yup
    .mixed()
    .oneOf(
      ["mantarsever", "superos", "sucuksever", "margarita"],
      "Please select food"
    )
    .required(),

  pizzaKenar: yup
    .mixed()
    .oneOf(
      ["incekenar", "klasikkenar", "bolsosislikenar", "sarımsaklıkenar"],
      "Please choose any edge"
    )
    .required(),

  pizzaBoyut: yup
    .mixed()
    .oneOf(
      ["kücükboy", "ortaboy", "buyukboy", "battalboy"],
      "Please choose pizza size"
    )
    .required(),
});

function Order() {
  const [formData, setFormData] = useState(dummyData);
  const [errors, setErrors] = useState(dummyDataErrors);
  const [disabled, setDisabled] = useState(true);
  const [gelenSiparis, setGelenSiparis] = useState(false);
  const [siparisData, setsiparisData] = useState(dummySiparisData);

  useEffect(() => {
    schema.isValid(formData).then((valid) => setDisabled(!valid));
  }, [formData]);

  const checkErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked, id } = event.target;

    if (type === "checkbox") {
      if (checked) {
        let ek = formData.ekMalzeme;
        let yeniArr = [...ek];
        yeniArr.push(id);
        setFormData({ ...formData, [name]: yeniArr });
      } else {
        let ek = formData.ekMalzeme;
        let yeniArr = [...ek];
        yeniArr.splice(yeniArr.indexOf(id), 1);
        setFormData({ ...formData, [name]: yeniArr });
      }
    } else {
      checkErrors(name, value);
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/api/orders", formData)
      .then((res) => {
        console.log(res.data);

        setGelenSiparis(true);
        setsiparisData(res.data);

        setTimeout(() => {
          setGelenSiparis(false);
        }, 3000);

        setTimeout(() => {
          setsiparisData(dummySiparisData);
        }, 10000);

        setFormData({
          pizzaTur: "",
          pizzaKenar: "",
          pizzaBoyut: "",
          ekMalzeme: [],
          not: "",
          name: "",
          adres: "",
          tel: "",
          siparisAdet: 0,
        });
      })
      .catch((err) => console.log("Errors: ", err));
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="section-img">
          <img src={pizza} alt="" />
        </div>

        <div className="pizza-section">
          <div className="pizza-sec">
            <div className="select-pizzaTur">
              <label htmlFor="pizza-tur">
                <b>Pizzanızı Seçiniz</b>
              </label>
              <br />
              <label htmlFor="mantarsever">Mantarsever</label>
              <input
                type="radio"
                id="mantarsever"
                name="pizzaTur"
                value="mantarsever"
                checked={formData.pizzaTur === "mantarsever"}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="süperos">Süperos</label>
              <input
                type="radio"
                id="süperos"
                name="pizzaTur"
                value="superos"
                checked={formData.pizzaTur === "superos"}
                onChange={handleChange}
              />

              <br />

              <label htmlFor="sucuksever">Sucuksever</label>
              <input
                type="radio"
                id="sucuksever"
                name="pizzaTur"
                value="sucuksever"
                checked={formData.pizzaTur === "sucuksever"}
                onChange={handleChange}
              />

              <br />

              <label htmlFor="margarita">Margarita</label>
              <input
                type="radio"
                id="margarita"
                name="pizzaTur"
                value="margarita"
                checked={formData.pizzaTur === "margarita"}
                onChange={handleChange}
              />
              <div className="errors">{errors.pizzaTur}</div>
            </div>

            <div className="pizza-kenar">
              <div>
                <b>Kenar Seçiniz</b>
              </div>
              <select
                name="pizzaKenar"
                id="pizza-kenar"
                size="1"
                value={formData.pizzaKenar}
                onChange={handleChange}
              >
                <option value="seciniz">Seçiniz</option>
                <option value="incekenar">İnce Kenar</option>
                <option value="klasikkenar">Klasik Kenar</option>
                <option value="bolsosislikenar">Bol Sosisli Kenar</option>
                <option value="sarımsaklıkenar">Sarımsaklı Kenar</option>
              </select>
              <div className="errors">{errors.pizzaKenar}</div>
            </div>

            <div className="pizza-boyut">
              <div>
                <b>Boyut Seçiniz</b>
              </div>
              <select
                name="pizzaBoyut"
                id="pizzaBoyut"
                size="1"
                value={formData.pizzaBoyut}
                onChange={handleChange}
              >
                <option value="seciniz">Seçiniz</option>
                <option value="kücükboy">Küçük boy</option>
                <option value="ortaboy">Orta Boy</option>
                <option value="buyukboy">Büyük Boy</option>
                <option value="battalboy">Battal Boy</option>
              </select>
              <div className="errors">{errors.pizzaBoyut}</div>
            </div>
          </div>
          <div className="div-ekmalzeme">
            <div className="pizza-section2">
              <div className="ekmalzemeler">
                <div>
                  <b>Ekstra Malzeme Seçin</b>
                </div>
                <div className="div-in">
                  <input
                    type="checkbox"
                    id="ekstra peynir"
                    name="ekMalzeme"
                    checked={formData.ekMalzeme.includes("ekstra peynir")}
                    onChange={handleChange}
                  />
                  <label htmlFor="peynir">Ekstra Peynir Ekle</label>
                  <br />

                  <input
                    type="checkbox"
                    id="ekstra sos"
                    name="ekMalzeme"
                    checked={formData.ekMalzeme.includes("ekstra sos")}
                    onChange={handleChange}
                  />
                  <label htmlFor="sos">Ekstra Sos Ekle</label>
                  <br />

                  <input
                    type="checkbox"
                    id="ekstra susam"
                    name="ekMalzeme"
                    checked={formData.ekMalzeme.includes("ekstra susam")}
                    onChange={handleChange}
                  />
                  <label htmlFor="susam">Ekstra Susam Ekle</label>
                  <br />

                  <input
                    type="checkbox"
                    id="ekstra acılı"
                    name="ekMalzeme"
                    checked={formData.ekMalzeme.includes("ekstra acılı")}
                    onChange={handleChange}
                  />
                  <label htmlFor="acı">Ekstra Acı Ekle</label>
                  <br />

                  <input
                    type="checkbox"
                    id="ekstra zeytin"
                    name="ekMalzeme"
                    checked={formData.ekMalzeme.includes("ekstra zeytin")}
                    onChange={handleChange}
                  />
                  <label htmlFor="zeytin">Ekstra Zeytin Ekle</label>
                </div>
              </div>
              <br />
              <div className="not-content">
                <label htmlFor="not">
                  <b>Sipariş Notu</b>
                </label>
                <br />
                <input
                  type="text"
                  size="50"
                  id="not"
                  name="not"
                  value={formData.not}
                  onChange={handleChange}
                />
                <div className="errors">{errors.not}</div>
              </div>
            </div>
          </div>
        </div>

        {/* İletişim */}
        <div className="pizza-section3">
          <div className="iletisim-section">
            <label htmlFor="name-input">
              <b>İsim Soyisim</b>
            </label>
            <input
              type="text"
              placeholder="İsim Soyisim giriniz"
              id="name-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <div className="errors">{errors.name}</div>
            <label htmlFor="adres-input">
              <b>Adres</b>
            </label>
            <input
              type="text"
              placeholder="Adresinizi giriniz"
              id="adres-input"
              name="adres"
              value={formData.adres}
              onChange={handleChange}
            />
            <div className="errors">{errors.adres}</div>
            <label htmlFor="tel-input">
              <b>Tel No</b>
            </label>
            <input
              type="text"
              placeholder="Telefon No giriniz"
              id="tel-input"
              name="tel"
              value={formData.tel}
              onChange={handleChange}
            />
            <div className="errors">{errors.tel}</div>
          </div>
          <div className="siparis-button">
            <div className="siparis-adet">
              <div>
                <b>Sipariş Adet</b>
              </div>
              <input
                type="number"
                id="siparis-adet"
                name="siparisAdet"
                value={formData.siparisAdet}
                min="1"
                onChange={handleChange}
              />
              <div className="errors">{errors.siparisAdet}</div>
            </div>
            <div className="button">
              <input
                disabled={disabled}
                type="submit"
                id="button"
                name="button"
                value="Sipariş Oluştur"
              />
            </div>
          </div>
        </div>
      </form>
      <div>
        {gelenSiparis && (
          <Alert color="primary" position="fixed">
            Siparişiniz Başarıyla Oluşturulmuştur.Afiyet Olsun.
          </Alert>
        )}
      </div>
      <div className="siparis-ozet">
        <h2>Sipariş Özeti</h2>
        <p>İD: {siparisData.id}</p>
        <p>CREATEDAT: {siparisData.createdAt}</p>
        <p>PİZZA ÇEŞİT: {siparisData.pizzaTur}</p>
        <p>PİZZA KENAR: {siparisData.pizzaKenar}</p>
        <p>PİZZA BOYUT: {siparisData.pizzaBoyut}</p>
        <p>EK MALZEMELER: {siparisData.ekMalzeme}</p>
        <p>NOT: {siparisData.not}</p>
        <p>AD SOYAD: {siparisData.name}</p>
        <p>ADRES: {siparisData.adres}</p>
        <p>TEL NO: {siparisData.tel}</p>
        <p>SİPARİŞ ADET: {siparisData.siparisAdet}</p>
      </div>
    </>
  );
}

export default Order;
