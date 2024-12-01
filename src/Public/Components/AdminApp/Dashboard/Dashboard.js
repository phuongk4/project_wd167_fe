import React, {useEffect, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom';
import Header from '../../Shared/Admin/Header/Header';
import Sidebar from '../../Shared/Admin/Sidebar/Sidebar';
import Footer from '../../Shared/Admin/Footer/Footer';
import adminService from "../../Service/AdminService";
import ConvertNumber from "../../Shared/Utils/ConvertNumber";
import ECharts from "echarts";
import * as echarts from 'echarts';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const charts = (dataChart) => {
        const chartDom = document.getElementById('reportsChart');
        const myChart = echarts.init(chartDom);

        const option = {
            title: {
                text: 'Tỉ lệ đơn hàng',
                subtext: 'Tính theo %',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Tỉ lệ đơn hàng',
                    type: 'pie',
                    radius: '50%',
                    data: dataChart,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        myChart.resize();
    }

    const homeDashboard = async () => {
        try {
            const res = await adminService.adminDashboard('', '', '', '');
            if (res.status === 200) {
                console.log('data: ', res.data);
                setData(res.data.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const isIncreaseOrder = data.order_action ? data.order_action.is_increase : false;
    const changeClassOrder = isIncreaseOrder ? "text-success" : "text-danger";
    const changeTextOrder = isIncreaseOrder ? "tăng" : "giảm";

    const isIncrease = data.revenue_action ? data.revenue_action.is_increase : false;
    const changeClass = isIncrease ? "text-success" : "text-danger";
    const changeText = isIncrease ? "tăng" : "giảm";

    const isIncreaseMember = data.member_action ? data.member_action.is_increase : false;
    const changeClassMember = isIncreaseMember ? "text-success" : "text-danger";
    const changeTextMember = isIncreaseMember ? "tăng" : "giảm";

    const renderChart = async (type) => {
        try {
            const res = await adminService.adminChartOrder(type);
            if (res.status === 200) {
                console.log('data: ', res.data);

                let data = res.data.data;

                let dataChart = [
                    {value: data.canceled, name: 'Đã huỷ'},
                    {value: data.completed, name: 'Đã hoàn thành'},
                    // {value: data.shipping, name: 'Đang giao hàng'},
                    // {value: data.delivered, name: 'Giao hàng thành công'},
                    // {value: data.process, name: 'Đang xử lý'}
                ];

                charts(dataChart);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        homeDashboard();
        renderChart('');
    }, []);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main" style={{backgroundColor: "#f6f9ff"}}>
                <div className="pagetitle">
                    <h1>Trang quản trị</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card sales-card">
                                        <div className="filter">
                                            <Link className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"/></Link>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Bộ lọc</h6>
                                                </li>
                                                <li><Link className="dropdown-item" to="#">Hôm nay</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong tháng</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong năm</Link></li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Đơn hàng <span>| Trong tháng</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-cart"/>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{data.order_action ? data.order_action.current_order : 0}</h6>
                                                    <>
                                                        <span className={`${changeClassOrder} small pt-1 fw-bold`}>
                                                            {data.order_action ? data.order_action.percent_change : 0}%
                                                        </span>
                                                        <span className="text-muted small pt-2 ps-1">
                                                            {changeTextOrder}
                                                        </span>
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-md-6">
                                    <div className="card info-card revenue-card">
                                        <div className="filter">
                                            <Link className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"/></Link>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Bộ lọc</h6>
                                                </li>
                                                <li><Link className="dropdown-item" to="#">Hôm nay</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong tháng</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong năm</Link></li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Doanh thu <span>| Trong tháng</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-currency-dollar"/>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{ConvertNumber(data.revenue_action ? data.revenue_action.current_total_revenue : 0)}</h6>
                                                    <>
                                                        <span className={`${changeClass} small pt-1 fw-bold`}>
                                                            {data.revenue_action ? data.revenue_action.percent_change : 0}%
                                                        </span>
                                                        <span className="text-muted small pt-2 ps-1">
                                                            {changeText}
                                                        </span>
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xxl-4 col-xl-12">
                                    <div className="card info-card customers-card">
                                        <div className="filter">
                                            <Link className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"/></Link>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Bộ lọc</h6>
                                                </li>
                                                <li><Link className="dropdown-item" to="#">Hôm nay</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong tháng</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong năm</Link></li>
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Khách hàng <span>| Trong tháng</span></h5>
                                            <div className="d-flex align-items-center">
                                                <div
                                                    className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                    <i className="bi bi-people"/>
                                                </div>
                                                <div className="ps-3">
                                                    <h6>{data.member_action ? data.member_action.current_member : 0}</h6>
                                                    <>
                                                        <span className={`${changeClassMember} small pt-1 fw-bold`}>
                                                            {data.member_action ? data.member_action.percent_change : 0}%
                                                        </span>
                                                        <span className="text-muted small pt-2 ps-1">
                                                            {changeTextMember}
                                                        </span>
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="card top-selling overflow-auto">
                                        <div className="filter">
                                            <Link className="icon" to="#" data-bs-toggle="dropdown"><i
                                                className="bi bi-three-dots"/></Link>
                                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <li className="dropdown-header text-start">
                                                    <h6>Bộ lọc</h6>
                                                </li>
                                                <li><Link className="dropdown-item" to="#">Hôm nay</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong tháng</Link></li>
                                                <li><Link className="dropdown-item" to="#">Trong năm</Link></li>
                                            </ul>
                                        </div>
                                        <div className="card-body pb-0">
                                            <h5 className="card-title">Bán chạy nhất <span>| Hôm nay</span></h5>
                                            <table className="table table-borderless">
                                                <colgroup>
                                                    <col style={{width: "10%"}}/>
                                                    <col style={{width: "x"}}/>
                                                    <col style={{width: "10%"}}/>
                                                    <col style={{width: "10%"}}/>
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th scope="col">Hình ảnh</th>
                                                    <th scope="col">Tên sản phẩm</th>
                                                    <th scope="col">Giá mới</th>
                                                    <th scope="col">Số lượt</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {data.product_action ? data.product_action.top_products.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row"><img
                                                                src={item.thumbnail}
                                                                alt=""/></th>
                                                            <td>{item.name}</td>
                                                            <td>{ConvertNumber(item.sale_price)}</td>
                                                            <td>{item.total_sold}</td>
                                                        </tr>
                                                    )
                                                }) : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="filter">
                                    <Link className="icon" to="#" data-bs-toggle="dropdown"><i
                                        className="bi bi-three-dots"/></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Bộ lọc</h6>
                                        </li>
                                        <li><Link className="dropdown-item" to="#">Hôm nay</Link></li>
                                        <li><Link className="dropdown-item" to="#">Trong tháng</Link></li>
                                        <li><Link className="dropdown-item" to="#">Trong năm</Link></li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Tỉ lệ đơn hàng <span>| Hôm nay</span></h5>
                                    <div id="reportsChart" style={{height: '600px'}}/>
                                </div>
                            </div>
                            <div className="card">
                                <div className="filter">
                                    <Link className="icon" to="#" data-bs-toggle="dropdown"><i
                                        className="bi bi-three-dots"/></Link>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                        <li className="dropdown-header text-start">
                                            <h6>Bộ lọc</h6>
                                        </li>
                                        <li><Link className="dropdown-item" to="#"
                                                  onClick={() => renderChart('day')}>Hôm nay</Link></li>
                                        <li><Link className="dropdown-item" to="#"
                                                  onClick={() => renderChart('month')}>Trong tháng</Link></li>
                                        <li><Link className="dropdown-item" to="#"
                                                  onClick={() => renderChart('year')}>Trong năm</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    )
}

export default Dashboard;
