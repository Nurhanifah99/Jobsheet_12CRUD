import React, { Component } from 'react'
import './BlogPost.css'
import Post from '../../BlogPost/Post'
import API from '../../../Services/index'

class BlogPost extends Component {

    state = {               //komponen state dari react untuk statefull component
        listMhs: [],     //variabel array yang digunakan untuk menyimpan data API
        insertMhs: {
            id: 1,
            NIM: 1,
            nama: "",
            alamat: "",
            hp: "",
            angkatan: 1,
            status: ""
        }
    }

    ambilDataDariServerAPI = () => {
        API.getMahasiswa().then(result => {
            this.setState({
                listMhs: result
            })
        })
    };

    componentDidMount() {   //komponen untuk mengecek ketika komponen telah di-mount-ing, maka panggil API
        this.ambilDataDariServerAPI();
    }

    handleHapus = (data) => {
        API.deleteMahasiswa(data)
            .then((response) => {
                this.ambilDataDariServerAPI();
            })
    }


    handleTambah = (event) => {
        let formInsertMhs = { ...this.state.insertMhs };
        let timestamp = new Date().getTime();
        formInsertMhs['id'] = timestamp;
        formInsertMhs[event.target.name] = event.target.value;
        this.setState({
            insertMhs: formInsertMhs
        });
    }

    handleTombolSimpan = () => {
        API.postMahasiswa(this.state.insertMhs)
            .then((response) => {
                this.ambilDataDariServerAPI();
            });
    };

    render() {
        return (
            <div className="post-artikel">
                <div className="row">
                    <div className="col-sm">
                        <div className="TopBar">
                            <div className="form pb-2">
                                <h1>INPUT MAHASISWA BARU</h1>
                                <div className="form-group row">
                                    <label htmlFor="NIM" className="col-sm-2 col-form-label">NIM</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="NIM" name="NIM" onChange={this.handleTambah} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="nama" name="nama" onChange={this.handleTambah} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="alamat" className="col-sm-2 col-form-label">Alamat</label>
                                    <div className="col-sm-10">
                                        <textarea type="text" className="form-control" id="alamat" name="alamat" rows="3" onChange={this.handleTambah} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="hp" className="col-sm-2 col-form-label">No Hp</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="hp" name="hp" onChange={this.handleTambah} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="angkatan" className="col-sm-2 col-form-label">Angkatan</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="angkatan" name="angkatan" onChange={this.handleTambah} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="status" name="status" onChange={this.handleTambah} />
                                    </div>
                                </div>
                                <button type="submit" className="btn" id="simpan" onClick={this.handleTombolSimpan}>Simpan</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="isiKonten">
                            <h2>Daftar Mahasiswa</h2><br />{
                                this.state.listMhs.map(mahasiswa => {     // looping dan masukan untuk setiap data yang ada di listArtikel ke variabel artikel
                                    return <Post key={mahasiswa.id} nimMhs={mahasiswa.NIM} namaMhs={mahasiswa.nama} alamatMhs={mahasiswa.alamat} idMahasiswa={mahasiswa.id} noHp={mahasiswa.hp} angkatanMhs={mahasiswa.angkatan} statusMhs={mahasiswa.status} hapusMahasiswa={this.handleHapus} /> // mappingkan data json dari API sesuai kategorinya
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogPost;
