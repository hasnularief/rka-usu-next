import Navbar from '@/components/Navbar';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import {
  LockOutlined, UnlockOutlined, DownOutlined, FileTextOutlined, QuestionCircleOutlined, EditOutlined
} from '@ant-design/icons';
import { Dropdown, Select, Button, Menu, Table, Tooltip, notification, Form, Input, InputNumber, Radio } from 'antd';

import dummy from '@/dummy/rka-manager.json';
import styles from '@/styles/rka.module.scss';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ModalForm from '@/components/ModalForm';

interface Props{
  id: number
}

const Manager: NextPage<Props> = ({id}) => {
  const data = dummy[id];

  const dropdownCetak = (
    <Menu>
      <Menu.Item key="1">
        Minimal
      </Menu.Item>
      <Menu.Item key="2">
        Detail
      </Menu.Item>
    </Menu>
  );

  const _findData = (id: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data.daftar_rencana_kerja.find((x: any) => x.id == id));
      }, 1000);
    });
  }
  
  const [editDataId, setEditDataId] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    _findData(editDataId).then((res: any) => {
      setFormData(res ?? {});
    });
  }, [editDataId]);

  useEffect(() => {
    setIsLoading(false);
  }, [formData]);

  const handleEditData = async (e: React.MouseEvent<HTMLElement>) => {
    setIsLoading(true);
    setEditDataId(parseInt(e.currentTarget.dataset.id ?? "0"));
  };

  const handleChangeData = (formValues: any) => {
    console.log(formValues);
    
    notification['success']({
      message: "Data berhasil diubah",
      duration: 2
    });
  };

  const handleCancelEdit = (e: React.MouseEvent<HTMLElement>) => {
    setEditDataId(0);
    setFormData({});
  };

  const columns: ColumnsType<any> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },{
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: 'Judul Pekerjaan',
      dataIndex: 'judul_pekerjaan',
      key: 'judul_pekerjaan',
      render: (value: any, record: any) => (<>
        <div>
          <span className='link-to-plan'>
            <Link href={`/rka/manager/plan/${record.id}`}>{value}</Link>
          </span>
        </div>
        <div>{record.description}</div>
      </>)
    },{
      title: 'R/P',
      dataIndex: 'r_p',
      key: 'r_p'
    },{
      title: 'RENSTRA',
      dataIndex: 'renstra',
      key: 'renstra',
      render: (val: any, record: any) => (
        <Tooltip overlay={<div style={{textAlign: "center"}}>{record.nama_renstra}</div>}>
          {val}
        </Tooltip>
      )
    },{
      title: 'KOKIN',
      dataIndex: 'kokin',
      key: 'kokin',
      render: (val: any, record: any) => (
        <Tooltip overlay={<div style={{textAlign: "center"}}>{record.nama_kokin}</div>}>
          {val}
        </Tooltip>
      )
    },{
      title: '#Kegiatan',
      dataIndex: 'kegiatan',
      key: 'kegiatan',
    },{
      title: 'APBN',
      dataIndex: 'apbn',
      key: 'apbn',
      render: (val: any) => Intl.NumberFormat("in-ID", {style: "decimal"}).format(val)
    },{
      title: 'NON-PNBP',
      dataIndex: 'non_pnbp',
      key: 'non_pnbp',
      render: (val: any) => Intl.NumberFormat("in-ID", {style: "decimal"}).format(val)
    },{
      title: 'BPPTN-BH',
      dataIndex: 'bpptn_bh',
      key: 'bpptn_bh',
      render: (val: any) => Intl.NumberFormat("in-ID", {style: "decimal"}).format(val)
    },{
      title: 'BOPTN',
      dataIndex: 'boptn',
      key: 'boptn',
      render: (val: any) => Intl.NumberFormat("in-ID", {style: "decimal"}).format(val)
    },{
      title: 'TOR|RAB',
      dataIndex: 'file_tor',
      key: 'file_tor',
      render: (val: any, record: any) => (
        <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
          <Tooltip overlay={<div style={{textAlign: "center"}}>
            {(record.file_tor) ? "Dokumen TOR" : "Dokumen TOR belum ada"}
          </div>
          }>
            <Button className={(record.file_tor) ? "btn-usu" : "btn-danger"} icon={<FileTextOutlined />}>
            </Button>
          </Tooltip>
          <Tooltip overlay={<div style={{textAlign: "center"}}>
            {(record.file_tor) ? "Dokumen RAB" : "Dokumen RAB belum ada"}
          </div>
          }>
            <Button className={(record.file_rab) ? "btn-usu" : "btn-danger"} icon={<FileTextOutlined />}>
            </Button>
          </Tooltip>
        </div>
      )
    },{
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (val: any) => (<Tooltip title={val}>
        <QuestionCircleOutlined />
      </Tooltip>)
    },{
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (val: any) => <Button className="btn-success" shape="circle" data-id={val} onClick={handleEditData}>
        <EditOutlined />
      </Button>
    }
  ];

  return <div>
    <Head>
      <title>Create Next App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Navbar />

    <main className={[styles.rkaModule, styles.rkaLatihan].join(" ")}>
      <div className={styles.rkaLatihanTitle}>
        <h1 style={{marginBottom: "0px"}}>RKA Latihan</h1>
        <span className={styles.rkaLatihanLock}>
          {(data.dikunci) ? (<><LockOutlined /> Dikunci</>) : (<><UnlockOutlined /> Terbuka</>)}
        </span>
      </div>
      <h1>
        { data.satuan_kerja }
      </h1>
      <table className={styles.rkaLatihanTable} style={{width: "100%"}}>
        <thead>
          <tr>
            <th></th>
            <th>APBN</th>
            <th>NON-PNBP</th>
            <th>BPPTN-BH</th>
            <th>BOPTN</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pagu</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.pagu_apbn)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.pagu_non_pnbp)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.pagu_bpptn_bh)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.pagu_boptn)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.pagu_total)}</td>
          </tr>
          <tr>
            <td>Perencanaan Rutin</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_rutin_apbn)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_rutin_non_pnbp)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_rutin_bpptn_bh)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_rutin_boptn)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_rutin_total)}</td>
          </tr>
          <tr>
            <td>Perencanaan Pengembangan</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_pengembangan_apbn)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_pengembangan_non_pnbp)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_pengembangan_bpptn_bh)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_pengembangan_boptn)}</td>
            <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.perencanaan_pengembangan_total)}</td>
          </tr>
          <Tooltip overlay={<div style={{textAlign: "center"}}>Perencanaan Rutin + Perencanaan Pengembangan</div>}>
            <tr>
              <td>Total Perencanaan</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.total_perencanaan_apbn)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.total_perencanaan_non_pnbp)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.total_perencanaan_bpptn_bh)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.total_perencanaan_boptn)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.total_perencanaan_total)}</td>
            </tr>
          </Tooltip>
          <Tooltip overlay={<div style={{textAlign: "center"}}>Pagu - Total Perencanaan</div>} >
            <tr>
              <td>Sisa Pagu</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.sisa_pagu_apbn)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.sisa_pagu_non_pnbp)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.sisa_pagu_bpptn_bh)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.sisa_pagu_boptn)}</td>
              <td>{Intl.NumberFormat('in-ID', {style: 'decimal'}).format(data.sisa_pagu_total)}</td>
            </tr>
          </Tooltip>
        </tbody>
      </table>
      <div className={styles.rkaLatihanTitle} style={{marginTop: "24px"}}>
        <h1>Daftar Rencana Kerja</h1>
        <div style={{display: "flex", gap: "10px"}}>
          <Select defaultValue="jenis" style={{width: "200px"}}>
            <Select.Option value="jenis">Jenis</Select.Option>
            <Select.Option value="rutin">Rutin</Select.Option>
            <Select.Option value="pengembangan">Pengembangan</Select.Option>
          </Select>
          <Dropdown overlay={dropdownCetak}>
            <Button className="btn btn-usu">
              Cetak <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <Table columns={columns} dataSource={data.daftar_rencana_kerja.map((x: any, i: number) => ({no: i + 1, ...x}))}
        scroll={{x: true}} className={styles.rkaLatihanDaftarRencanaKerja}
      />
    </main>

    <ModalForm isOpen={!!editDataId} isLoading={isLoading}
      formTitle='Form Edit'
      onCancel={handleCancelEdit}
      onSubmit={handleChangeData}
      formData={formData}
    >
      <Form.Item labelCol={{span: 6}} label="Judul Pekerjaan" name="judul_pekerjaan">
        <Input />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="Deskripsi Judul" name="description">
        <Input />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="R/P" name="r_p">
        <Radio.Group>
          <Radio value="R">R</Radio>
          <Radio value="P">P</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="RENSTRA" name="renstra">
        <Select>
          <Select.Option value={193}>
            Persentase pemahaman pemangku kepentingan terhadap visi
          </Select.Option>
          <Select.Option value={205}>
            Peringkat lembaga penelitian oleh kementerian
          </Select.Option>
          <Select.Option value={207}>
            Jumlah jurnal bereputasi terakreditasi nasional (Sinta)
          </Select.Option>
          <Select.Option value={218}>
            Jumlah produk inovasi yang dimanfaatkan masyarakat/industri
          </Select.Option>
          <Select.Option value={230}>
            Jumlah perolehan dana  kerja sama nasional dalam miliar rupiah
          </Select.Option>
          <Select.Option value={248}>
            Persentase layanan berbasis online
          </Select.Option>
          <Select.Option value={280}>
            Jumlah mahasiswa S-1 berwirausaha
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item labelCol={{span: 6}} wrapperCol={{span: 18}} label="KOKIN" name="kokin">
        <Select>
          <Select.Option value={196}>
            Rata-rata predikat SAKIP Satker minimal BB
          </Select.Option>
          <Select.Option value={211}>
            Persentase dosen tetap berkualifikasi akademik S3; memiliki sertifikat kompetensi/profesi yang diakui oleh industri dan dunia kerja; atau berasal dari kalangan praktisi profesional, dunia industri, atau dunia kerja
          </Select.Option>
          <Select.Option value={217}>
            Persentase program studi S1 dan D4/D3/D2 yang melaksanakan kerja sama dengan mitra.
          </Select.Option>
          <Select.Option value={205}>
            Persentase lulusan S1 dan D4/D3/D2 yang menghabiskan paling sedikit 20 (dua puluh) sks di luar kampus; atau meraih prestasi paling rendah tingkat nasional.
          </Select.Option>
          <Select.Option value={214}>
            Jumlah keluaran penelitian dan pengabdian kepada masyarakat yang berhasil mendapat rekognisi internasional atau diterapkan oleh masyarakat per jumlah dosen.
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="#Kegiatan" name="kegiatan">
        <InputNumber style={{width: "100%"}} />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="APBN" name="apbn">
        <InputNumber style={{width: "100%"}} />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="NON-PNBP" name="non_pnbp">
        <InputNumber style={{width: "100%"}} />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="BPPTN-BH" name="bpptn_bh">
        <InputNumber style={{width: "100%"}} />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="BOPTN" name="boptn">
        <InputNumber style={{width: "100%"}} />
      </Form.Item>
      <Form.Item labelCol={{span: 6}} label="Status" name="status">
        <Input />
      </Form.Item>
    </ModalForm>

    <footer></footer>
  </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id
    }
  }
}

export default Manager;