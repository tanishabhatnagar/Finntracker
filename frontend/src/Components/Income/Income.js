import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/layout';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import { rupee } from '../../utils/Icons';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomeStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>{rupee}{totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }

    .income-content {
        display: flex;
        gap: 2rem;

        .form-container {
            flex: 1;
        }

        .incomes {
            flex: 2;
        }
    }

    @media (max-width: 768px) {
        .income-content {
            flex-direction: column;  // Stack form and incomes vertically on mobile screens

            .form-container {
                order: 1;  // Ensure form appears first
            }

            .incomes {
                order: 2;  // Ensure incomes appear below the form
            }

            .incomes {
                .income-item {
                    word-wrap: break-word;  // Ensure text wraps within the container
                    overflow-wrap: break-word;  // Handle long words
                    padding: 1rem;  // Add padding to ensure content is well-contained
                    box-sizing: border-box;

                    .delete-icon {
                        font-size: 1.2rem;  // Decrease the size of the delete icon
                        margin-left: 0.5rem;  // Reduce space between comment and delete icon
                    }
                }
            }
        }
    }
`;

export default Income;
