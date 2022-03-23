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
import { JabatanApi } from "../../Api";
import { FaPlus, FaEdit, FaClipboardList } from "react-icons/fa";
const Jabatan = () => {
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
    Axios.all([JabatanApi.get({ page: paginationConfig.currentPage })])
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
    Axios.all([JabatanApi.get({ q: searchKey, page: paginationConfig.currentPage })])
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
      kode_jabatan: Yup.string().required("Masukkan Kode Jabatan"),
      nama_jabatan: Yup.string().required("Masukkan Nama Jabatan"),
    });

    const formInitialValues = {
      kode_jabatan: modalData.kode_jabatan ?? "",
      nama_jabatan: modalData.nama_jabatan ?? "",
      keterangan: modalData.keterangan ?? "",
    };
    const formSubmitHandler = (values) => {
      if (modalShow.type === "tambah") {
        JabatanApi.create(values)
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
        JabatanApi.update(modalData.id, values)
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
                Tambah Data Jabatan
              </div>
            ) : modalShow.type === "edit" ? (
              <div className="text-success">
                <FaEdit className="mr-4" />
                Update Data jabatan
              </div>
            ) : (
              <div className="text-info">
                <FaClipboardList className="mr-4" />
                Detail Data Jabatan
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
                  name="kode_jabatan"
                  placeholder="Masukan Kode Jabatan"
                  onChange={handleChange}
                  readOnly={modalShow.type === "tambah" || modalShow.type === "edit" ? false : true}
                  value={values.kode_jabatan}
                  isInvalid={errors.kode_jabatan && touched.kode_jabatan && true}
                  errorsText={errors.kode_jabatan && touched.kode_jabatan && errors.kode_jabatan}
                />
                <InputComp
                  label="Nama Jabatan"
                  type="text"
                  name="nama_jabatan"
                  placeholder="Masukan Nama Jabatan"
                  onChange={handleChange}
                  readOnly={modalShow.type === "tambah" || modalShow.type === "edit" ? false : true}
                  value={values.nama_jabatan}
                  isInvalid={errors.nama_jabatan && touched.nama_jabatan && true}
                  errorsText={errors.nama_jabatan && touched.nama_jabatan && errors.nama_jabatan}
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
      Axios.all([JabatanApi.delete(modalData.id)])
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
        title="Jabatan"
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
      <Header title="Jabatan" text1="Master" text2="Jabatan" />
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
                      <td>{val.kode_jabatan}</td>
                      <td>{val.nama_jabatan}</td>
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

export default Jabatan;
