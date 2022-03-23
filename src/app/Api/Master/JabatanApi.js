import Services from "../../Services";

class JabatanApi {
  get(params) {
    return Services.get("/jabatan/", { params });
  }
  create(value) {
    return Services.post("/jabatan/", value);
  }
  update(id, value) {
    return Services.put(`/jabatan/${id}`, value);
  }
  delete(id) {
    return Services.delete(`/jabatan/${id}`);
  }
}

export default new JabatanApi();
