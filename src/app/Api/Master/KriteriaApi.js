import Services from "../../Services";

class KriteriaApi {
  get(params) {
    return Services.get("/kriteria/", { params });
  }
  create(value) {
    return Services.post("/kriteria/", value);
  }
  update(id, value) {
    return Services.put(`/kriteria/${id}`, value);
  }
  delete(id) {
    return Services.delete(`/kriteria/${id}`);
  }
}

export default new KriteriaApi();