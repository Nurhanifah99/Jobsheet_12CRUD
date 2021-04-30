import React, { Component } from "react";
import "../BlogPost/BlogPost1.css";
import Post from "../../../component/BlogPost/Post1";
// import API from "../../../Services/index"
import firebase from "firebase";
import firebaseConfig from "../../../firebase/config"

class BlogPost extends Component {
  constructor(props) {
    super(props);
    // firebase.initializeApp(firebaseConfig);//inisialisai konfigurasi database firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    this.state = {
      listArtikel: []
    }
  }
  // state = {
  //   // komponen state dari React untuk statefull component
  //   listArtikel: [], // variabel array yang digunakan untuk menyimpan data API
  //   insertArtikel: {
  //     // variabel yang digunakan untuk menampung sementara data yang akan diimport
  //     userId: 1, // kolom userId, id, title, dan body sama, mengikuti kolom yang ada pada listArtikel.json
  //     id: 1,
  //     title: "",
  //     body: "",
  //   },
  // };

  ambilDataDariSeverAPI = () => {
    let ref = firebase.database().ref("/");
    ref.on("value", snapsnot => {
      const state = snapsnot.val();
      this.setState(state);
    });
  }

  simpanDataKeServerAPI = () => {
    firebase.database()
      .ref("/")
      .set(this.state);
  }

  // API.getNewsBlog().then(result => {
  //   this.setState({
  //     listArtikel: result
  //   })
  // })
  // };

  componentDidMount() {
    // komponen untuk mengecek ketika component telah dimounting, maka panggil API
    this.ambilDataDariSeverAPI(); // ambil data dari server API lokal
  }

  componentDidUpdate(prevProps, prevState) {
    // komponen untuk mengecek ketika component telah dimounting, maka panggil API
    if (prevState !== this.state) {
      this.simpanDataKeServerAPI();
    }
  }

  handleHapusArtikel = (idArtikel) => {
    const { listArtikel } = this.state;
    const newState = listArtikel.filter(data => {
      return data.uid !== idArtikel;
    });
    this.setState({ listArtikel: newState });
  }

  // handleTambahArtikel = (event) => {
  //   // fungsi untuk meng-handle form tambah data artikel
  //   let formInsertArtikel = { ...this.state.insertArtikel }; // cloning data state insertArtikel ke dalam variabel formInsertArtikel
  //   let timestamp = new Date().getTime(); // digunakan untuk menyimpan waktu (sebagai id artikel)
  //   formInsertArtikel["id"] = timestamp;
  //   formInsertArtikel[event.target.name] = event.target.value; // menyimpan data onChange ke formInsertArtikel sesuai dengn target yang diisi
  //   this.setState({
  //     insertArtikel: formInsertArtikel,
  //   });
  // };

  handleTombolSimpan = (event) => {
    let title = this.refs.judulArtikel.value;
    let body = this.refs.isiArtikel.value;
    let uid = this.refs.uid.value;

    if (uid && title && body) {
      const { listArtikel } = this.state;
      const indeksArtikel = listArtikel.findIndex(data => {
        return data.uid === uid;
      });
      listArtikel[indeksArtikel].title = title;
      listArtikel[indeksArtikel].body = body;
      this.setState({ listArtikel });
    } else if (title && body) {
      const uid = new Date().getTime().toString();
      const { listArtikel } = this.state;
      listArtikel.push({ uid, title, body });
      this.setState({ listArtikel });
    }

    this.refs.judulArtikel.value = "";
    this.refs.isiArtikel.value = "";
    this.refs.uid.value = "";
  };


  // API.postNewsBlog(this.state.insertArtikel)
  //   .then((response) => {
  //     this.ambilDataDariSeverAPI();
  //   });


  render() {
    return (
      <div className="post-artikel">
        <div className="form pb-2 border-bottom">
          <div className="form-gorup row">
            <label htmlFor="title" className="col-sm-2 col-form-label">
              Judul
              </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                ref="judulArtikel"
              // onChange={this.handleTambahArtikel}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="body" className="col-sm-2 col-form-label">
              Isi
              </label>
            <div className="col-sm-10">
              <textarea
                name="body"
                id="body"
                rows="3"
                className="form-control"
                ref="isiArtikel"
              // onChange={this.handleTambahArtikel}
              ></textarea>
            </div>
          </div>
          <input type="hidden" name="uid" ref="uid" />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleTombolSimpan}
          >
            Simpan
            </button>
        </div>
        <h2>Daftar Artikel</h2>
        {this.state.listArtikel.map((artikel) => {
          // looping dan masukkan untuk setiap data yang ada di listArtikel ke variabel artikel
          return (
            <Post
              key={artikel.uid}
              judul={artikel.title}
              isi={artikel.body}
              idArtikel={artikel.uid}
              hapusArtikel={this.handleHapusArtikel}
            />
          ); // mappingkan data json dari API sesuai dengan kategorinya
        })}
      </div>
    );
  }
}

export default BlogPost;
