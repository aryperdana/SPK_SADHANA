import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Table, Modal, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import {
  AddButton,
  ActionButtonGroup,
  InputSearch,
  InputComp,
  ActionButton,
  Spinner,
  Pagination,
  AlertComp,
  Header,
  Layout,
  DeleteModal,
} from "../../Components";
import { KaryawanApi } from "../../Api";
import { FaPlus, FaEdit, FaClipboardList } from "react-icons/fa";
const Karyawan = () => {
  const [modalShow, setModalShow] = useState({ show: false, type: "" });
  const [modalDelete, setModalDelete] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [dataJabatan, setDataJabatan] = useState([]);
  const [modalData, setModalData] = useState({});
  const [paginationConfig, setPaginationConfig] = useState({
    pageCount: 0,
    currentPage: 1,
  });
  const [searchKey, setSearchKey] = useState("");

  const getData = () => {
    setIsLoading(true);
    Axios.all([KaryawanApi.get({ page: paginationConfig.currentPage }), KaryawanApi.getJabatan()])
      .then(
        Axios.spread((res, jabatan) => {
          setItems(res.data.data);
          setPaginationConfig({
            pageCount: res.data.last_page,
            currentPage: res.data.current_page,
          });
          setDataJabatan(jabatan.data);
        })
      )
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const SeacrhData = () => {
    setIsLoading(true);
    Axios.all([KaryawanApi.get({ q: searchKey, page: paginationConfig.currentPage })])
      .then(
        Axios.spread((res) => {
          setItems(res.data.data);
          setPaginationConfig({
            pageCount: res.data.last_page,
            currentPage: res.data.current_page,
          });
          setShowAlert({ show: true, type: "primary", text: "Hasil Pencarian : " + searchKey });
        })
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const AddModal = () => {
    const formValidationSchema = Yup.object().shape({
      kode_karyawan: Yup.string().required("Masukkan Kode Karyawan"),
      nama_karyawan: Yup.string().required("Masukkan Nama Karyawan"),
    });

    const formInitialValues = {
      kode_karyawan: modalData.kode_karyawan ?? "",
      nama_karyawan: modalData.nama_karyawan ?? "",
      id_jabatan: modalData.id_jabatan ?? "",
      no_telp: modalData.no_telp ?? "",
      alamat: modalData.alamat ?? "",
      jenis_kelamin: modalData.jenis_kelamin ?? "",
      keterangan: modalData.keterangan ?? "",
    };
    const formSubmitHandler = (values) => {
      if (modalShow.type === "tambah") {
        KaryawanApi.create(values)
          .then((res) => {
            setShowAlert({ show: true, type: "primary", text: "Tambah Data Berhasil !!" });
          })
          .catch((err) => {
            setShowAlert({ show: true, type: "danger", text: "Tambah Data gagal !!" });
          })
          .finally(() => {
            setModalShow(false);
            getData();
          });
      }

      if (modalShow.type === "edit") {
        KaryawanApi.update(modalData.id, values)
          .then((res) => {
            setShowAlert({ show: true, type: "primary", text: "Tambah Data Berhasil !!" });
          })
          .catch((err) => {
            setShowAlert({ show: true, type: "danger", text: "Tambah Data gagal !!" });
          })
          .finally(() => {
            setModalShow(false);
            getData();
          });
      }
    };

    return (
      <Modal show={modalShow.show} onHide={() => setModalShow({ show: false })} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: "white" }}>
          <Modal.Title>
            {modalShow.type === "tambah" ? (
              <div className="text-primary">
                <FaPlus className="mr-4" />
                Tambah Data Karyawan
              </div>
            ) : modalShow.type === "edit" ? (
              <div className="text-success">
                <FaEdit className="mr-4" />
                Update Data jabatan
              </div>
            ) : (
              <div className="text-info">
                <FaClipboardList className="mr-4" />
                Detail Data Karyawan
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          <Formik
            initialValues={formInitialValues}
            validationSchema={formValidationSchema}
            onSubmit={formSubmitHandler}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit} className="forms-sample">
                <Row>
                  <Col md="6">
                    <InputComp
                      label="Kode Karyawan"
                      type="text"
                      name="kode_karyawan"
                      placeholder="Masukan Kode Karyawan"
                      onChange={handleChange}
                      readOnly={
                        modalShow.type === "tambah" || modalShow.type === "edit" ? false : true
                      }
                      value={values.kode_karyawan}
                      isInvalid={errors.kode_karyawan && touched.kode_karyawan && true}
                      errorsText={
                        errors.kode_karyawan && touched.kode_karyawan && errors.kode_karyawan
                      }
                    />
                    <InputComp
                      label="Nama Karyawan"
                      type="text"
                      name="nama_karyawan"
                      placeholder="Masukan Nama Karyawan"
                      onChange={handleChange}
                      readOnly={
                        modalShow.type === "tambah" || modalShow.type === "edit" ? false : true
                      }
                      value={values.nama_karyawan}
                      isInvalid={errors.nama_karyawan && touched.nama_karyawan && true}
                      errorsText={
                        errors.nama_karyawan && touched.nama_karyawan && errors.nama_karyawan
                      }
                    />
                    <Form.Group>
                      <Form.Label>Jabatan</Form.Label>
                      <Select
                        isSearchable
                        options={dataJabatan.map((val) => ({
                          value: val.id_jabatan,
                          label: val.nama_jabatan,
                        }))}
                        closeMenuOnSelect={true}
                        onChange={(res) => setFieldValue(res.value)}
                        // value={optionSelected}
                        name="id_jabatan"
                        placeholder="Pilih Jabatan"
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: 45,
                            fontSize: 14,
                            borderColor: "#ebedf2",
                            paddingLeft: 10,
                            borderRadius: 2,
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            opacity: 0.5,
                          }),
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="6">
                    <Form.Group>
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Select
                        isSearchable
                        // options={options}
                        // isLoading={!options}
                        closeMenuOnSelect={true}
                        onChange={handleChange}
                        // value={optionSelected}
                        name="id_jabatan"
                        placeholder="Pilih Jabatan"
                        styles={{
                          control: (base) => ({
                            ...base,
                            minHeight: 45,
                            fontSize: 14,
                            borderColor: "#ebedf2",
                            paddingLeft: 10,
                            borderRadius: 2,
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            opacity: 0.5,
                          }),
                        }}
                      />
                    </Form.Group>
                    <InputComp
                      label="No Telepon"
                      type="text"
                      name="no_telp"
                      placeholder="Masukan No Telepon"
                      onChange={handleChange}
                      readOnly={
                        modalShow.type === "tambah" || modalShow.type === "edit" ? false : true
                      }
                      value={values.no_telp}
                    />
                    <InputComp
                      label="Alamat"
                      type="text"
                      name="alamat"
                      placeholder="Masukan Keterangan"
                      onChange={handleChange}
                      readOnly={
                        modalShow.type === "tambah" || modalShow.type === "edit" ? false : true
                      }
                      value={values.alamat}
                    />
                  </Col>
                </Row>
                <InputComp
                  label="Keterangan"
                  type="text"
                  name="keterangan"
                  placeholder="Masukan Keterangan"
                  onChange={handleChange}
                  readOnly={modalShow.type === "tambah" || modalShow.type === "edit" ? false : true}
                  value={values.keterangan}
                />
                <div className="d-flex justify-content-end">
                  {modalShow.type === "tambah" ? (
                    <ActionButton aksi="add" type="submit" loading={isSubmitting} />
                  ) : modalShow.type === "edit" ? (
                    <ActionButton aksi="" type="submit" loading={isSubmitting} />
                  ) : (
                    ""
                  )}
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };

  const Hapus = () => {
    const DeleteData = () => {
      Axios.all([KaryawanApi.delete(modalData.id)])
        .then(
          Axios.spread((res) => {
            setShowAlert({ show: true, type: "primary", text: "Hapus Data Berhasil !!" });
          })
        )
        .catch(() => {
          setShowAlert({ show: true, type: "danger", text: "Hapus Data Gagal !!" });
        })
        .finally(() => {
          setModalDelete(false);
          getData();
        });
    };
    return (
      <DeleteModal
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        title="Karyawan"
        value={modalData.nama_karyawan}
        onClick={() => DeleteData()}
      />
    );
  };

  useEffect(() => {
    if (searchKey === "") {
      getData();
    }
  }, [paginationConfig.currentPage, paginationConfig.pageCount]);

  return (
    <div>
      {showAlert.show === true ? (
        <AlertComp
          variant={showAlert.type}
          onClose={() => setShowAlert({ show: false })}
          text={showAlert.text}
        />
      ) : (
        ""
      )}
      <Header title="Karyawan" text1="Master" text2="Karyawan" />
      {isLoading === false ? (
        <Layout>
          <Layout.HeadLayout>
            <Layout.HeadLayoutSeacrh>
              <InputSearch
                onChange={(res) => setSearchKey(res.target.value)}
                value={searchKey}
                onClick={() => {
                  SeacrhData();
                }}
              />
            </Layout.HeadLayoutSeacrh>
            <Layout.HeadLayoutButton>
              <AddButton
                text="Tambah"
                onClick={() => {
                  setModalShow({ show: true, type: "tambah" });
                  setModalData({});
                }}
              />
            </Layout.HeadLayoutButton>
          </Layout.HeadLayout>
          <Layout.TableLayout className="mt-4">
            <Table bordered hover responsive size="sm">
              <thead style={{ backgroundColor: "#F2EDF3" }}>
                <tr>
                  <th className="text-center p-3">No</th>
                  <th className="text-center p-3">Aksi</th>
                  <th className="text-center p-3">Kode</th>
                  <th className="text-center p-3">Nama Karyawan</th>
                  <th className="text-center p-3">Nama Jabatan</th>
                  <th className="text-center p-3">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((val, ind) => (
                    <tr>
                      <td style={{ width: 40 }}>{ind + 1}</td>
                      <td width={100}>
                        <ActionButtonGroup
                          onClickDetail={() => {
                            setModalShow({ show: true });
                            setModalData(val);
                          }}
                          onClickEdit={() => {
                            setModalShow({ show: true, type: "edit" });
                            setModalData(val);
                          }}
                          onClickDelete={() => {
                            setModalDelete(true);
                            setModalData(val);
                          }}
                        />
                      </td>
                      <td>{val.kode_karyawan}</td>
                      <td>{val.nama_karyawan}</td>
                      <td>{val.nama_karyawan}</td>
                      <td>{val.keterangan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div
                        className="d-flex justify-content-center my-4"
                        style={{ fontWeight: "bold", fontSize: 18 }}
                      >
                        Data Tidak Ada
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Layout.TableLayout>
          <Pagination
            onPageChange={({ selected }) =>
              setPaginationConfig({ ...paginationConfig, currentPage: selected + 1 })
            }
            pageCount={paginationConfig.pageCount}
            currentPage={paginationConfig.currentPage}
          />
        </Layout>
      ) : (
        <Spinner />
      )}
      <AddModal />
      <Hapus />
    </div>
  );
};

export default Karyawan;
