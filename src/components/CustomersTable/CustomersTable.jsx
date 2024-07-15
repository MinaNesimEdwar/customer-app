import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const CustomerTable = ({
  customers,
  transactions,
  setSelectedCustomer,
  selectedCustomer,
}) => {
  const [filter, setFilter] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <label className="mb-2" htmlFor="filter">Filter by customer name</label>
      <Form.Control
        id="filter"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-3 text-white bg-transparent border-info focus-ring focus-ring-info"
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th className="text-info">Name</th>
            <th className="text-info">Total Transactions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => {
            // eslint-disable-next-line react/prop-types
            const customerTransactions = transactions.filter(
              (transaction) => transaction.customer_id === customer.id
            );
            const totalAmount = customerTransactions.reduce(
              (total, transaction) => total + transaction.amount,
              0
            );
            return (
              <tr
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                style={{ cursor: "pointer" }}
              >
                <td>{customer.name}</td>
                <td>{totalAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {selectedCustomer != null ? (
        ""
      ) : (
        <p className="text-info ">
          * You Should select customer
        </p>
      )}
    </div>
  );
};

export default CustomerTable;