import React, { useState, useEffect } from "react";
import Axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Table, Modal } from "react-bootstrap";
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
import { KriteriaApi } from "../../Api";
import { FaPlus, FaEdit, FaClipboardList } from "react-icons/fa";
const Kriteria = () => {
  const [modalShow, setModalShow] = useState({ show: false, type: "" });
  const [modalDelete, setModalDelete] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [modalData, setModalData] = useState({});
  const [paginationConfig, setPaginationConfig] = useState({
    pageCount: 0,
    currentPage: 1,
  });
  const [searchKey, setSearchKey] = useState("");


  const getData = () => {
    setIsLoading(true);
    Axios.all([KriteriaApi.get({ page: paginationConfig.currentPage })])
      .then(
        Axios.spread((res) => {
          setItems(res.data.data);
          setPaginationConfig({
            pageCount: res.data.last_page,
            currentPage: res.data.current_page,
          });
        })
      )
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const SeacrhData = () => {
    setIsLoading(true);
    Axios.all([KriteriaApi.get({ q: searchKey, page: paginationConfig.currentPage })])
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
      kode_kriteria: Yup.string().required("Masukkan Kode Kriteria"),
      nama_kriteria: Yup.string().required("Masukkan Nama Kriteria"),
    });

    const formInitialValues = {
      kode_kriteria: modalData.kode_kriteria ?? "",
      nama_kriteria: modalData.nama_kriteria ?? "",
      keterangan: modalData.keterangan ?? "",
    };
    const formSubmitHandler = (values) => {
      if (modalShow.type === "tambah") {
        KriteriaApi.create(values)
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
        KriteriaApi.update(modalData.id, values)
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
      <Modal show={modalShow.show} onHide={() => setModalShow({ show: false })}>
        <Modal.Header closeButton style={{ backgroundColor: "white" }}>
          <Modal.Title>
            {modalShow.type === "tambah" ? (
              <div className="text-primary">
                <FaPlus className="mr-4" />
                Tambah Data Kriteria
              </div>
            ) : modalShow.type === "edit" ? (
              <div className="text-success">
                <FaEdit className="mr-4" />
                Update Data jabatan
              </div>
            ) : (
              <div className="text-info">
                <FaClipboardList className="mr-4" />
                Detail Data Kriteria
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
            {({ values, errors, touched, isSubmitting, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="forms-sample">
                <InputComp
                  label="Kode"
                  type="text"
                  name="kode_kriteria"
                  placeholder="Masukan Kode Kriteria"
                  onChange={handleChange}
                  readOnly={modalShow.type === "tambah" || modalShow.type === "edit" ? false : true}
                  value={values.kode_kriteria}
                  isInvalid={errors.kode_kriteria && touched.kode_kriteria && true}
                  errorsText={errors.kode_kriteria && touched.kode_kriteria && errors.kode_kriteria}
                />
                <InputComp
                  label="Nama Kriteria"
                  type="text"
                  name="nama_kriteria"
                  placeholder="Masukan Nama Kriteria"
                  onChange={handleChange}
                  readOnly={modalShow.type === "tambah" || modalShow.type === "edit" ? false : true}
                  value={values.nama_kriteria}
                  isInvalid={errors.nama_kriteria && touched.nama_kriteria && true}
                  errorsText={errors.nama_kriteria && touched.nama_kriteria && errors.nama_kriteria}
                />
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
      Axios.all([KriteriaApi.delete(modalData.id_kriteria)])
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
        title="Kriteria"
        value={modalData.nama_jabatan}
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
      <Header title="Kriteria" text1="Master" text2="Kriteria" />
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
                  <th className="text-center p-3">Nama Kriteria</th>
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
                      <td>{val.kode_kriteria}</td>
                      <td>{val.nama_kriteria}</td>
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

export default Kriteria;
