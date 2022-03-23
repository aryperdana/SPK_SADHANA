import Services from "../../Services";

class KaryawanApi {
  get(params) {
    return Services.get("/karyawan/", { params });
  }
  getJabatan() {
    return Services.get("/jabatan/dropdown/");
  }
  create(value) {
    return Services.post("/karyawan/", value);
  }
  update(id, value) {
    return Services.put(`/karyawan/${id}`, value);
  }
  delete(id) {
    return Services.delete(`/karyawan/${id}`);
  }
}

export default new KaryawanApi();
