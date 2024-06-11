import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/layout';
import { dollar, rupee } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h3>Total Income</h3>
                                <p>
                                    {rupee} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h3>Total Expense</h3>
                                <p>
                                    {rupee} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance balance-desktop">
                                <h3>Total Balance</h3>
                                <p>
                                    {rupee} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <div className="salary-details">
                            <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                            <div className="salary-item">
                                <p>
                                    {rupee}{Math.min(...incomes.map(item => item.amount))}
                                </p>
                                <p>
                                    {rupee}{Math.max(...incomes.map(item => item.amount))}
                                </p>
                            </div>
                            <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                            <div className="salary-item">
                                <p>
                                    {rupee}{Math.min(...expenses.map(item => item.amount))}
                                </p>
                                <p>
                                    {rupee}{Math.max(...expenses.map(item => item.amount))}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mobile-summary">
                        <div className="mobile-income">
                            <h3>Total Income</h3>
                            <p>{rupee} {totalIncome()}</p>
                        </div>
                        <div className="mobile-expense">
                            <h3>Total Expense</h3>
                            <p>{rupee} {totalExpenses()}</p>
                        </div>
                        <div className="mobile-balance">
                            <h3>Total Balance</h3>
                            <p>{rupee} {totalBalance()}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;

        .chart-con {
            grid-column: 1 / 4;
            height: 350px;

            .amount-con {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;

                .income, .expense {
                    grid-column: span 2;
                }

                .income, .expense, .balance {
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;

                    p {
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }

                .balance {
                    grid-column: 2 / 4;
                    // display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-bottom: 1rem; /* Add space below the total balance for desktops */

                    p {
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;

            .salary-details {
                display: block;
            }

            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .salary-title {
                font-size: 1.2rem;

                span {
                    font-size: 1.8rem;
                }
            }

            .salary-item {
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }

    .mobile-summary {
        display: none; /* Hide by default */
        .mobile-income, .mobile-expense, .mobile-balance {
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 1rem;
            text-align: center;
            margin-top: 1rem;

            h3 {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }

            p {
                color: var(--color-green);
                opacity: 0.6;
                font-size: 2rem;
                font-weight: 700;
            }
        }
    }

    @media (max-width: 768px) {
        .stats-con {
            grid-template-columns: 1fr;  // Change to a single column layout

            .chart-con, .history-con {
                grid-column: 1 / -1;  // Make each component span the full width
            }

            .chart-con {
                height: 250px;
                width: 100%;  // Reduce chart size for smaller screens
            }

            .amount-con {
                grid-template-columns: 1fr 1fr;  // Adjust to two columns for better fit
                .income, .expense, .balance {
                    display: none;  // Hide income, expense, and balance for mobile screens
                }
            }

            .balance-desktop {
                display: none;  // Hide the desktop balance section for mobile screens
            }
            

            .history-con {
                .salary-details {
                    display: none;  // Hide salary details for mobile screens
                }

                .salary-item {
                    width: 100%; /* Adjust the width for mobile screens */
                }

                .salary-item p {
                    font-size: 1.2rem;  // Adjust font size in salary items
                }
            }

            .mobile-summary {
                display: block; /* Show the mobile summary section */

                .mobile-income, .mobile-expense, .mobile-balance {
                    width: 50%; /* Adjust the width for mobile screens */
                }
            }

            margin-top: 60px; // Add margin to avoid overlapping with the fixed navigation
        }
    }

    @media (min-width: 769px) {
        .chart-con {
            height: 500px; // Increase the height for larger screens
        }
    }
`;

export default Dashboard;
