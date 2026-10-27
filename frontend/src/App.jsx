import { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001/watertank';

function App() {
  const [tanks, setTanks] = useState([]);
  const [form, setForm] = useState({
    tankcode: '',
    capacityLitres: '',
    material: '',
    installedDate: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadTanks() {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/DisplayAll`);
      setTanks(response.data);
    } catch (err) {
      setTanks([]);

      if (err.response?.status === 404) {
        setMessage('No water tanks found. Add your first tank!');
      } else {
        setError('Unable to load tanks. Check whether the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage('');
    setError('');

    if (
      !form.tankcode.trim() ||
      !form.material ||
      !form.installedDate ||
      form.capacityLitres === ''
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (Number(form.capacityLitres) <= 0) {
      setError('Capacity must be greater than zero.');
      return;
    }

    try {
      await axios.post(`${API_URL}/Add`, {
        ...form,
        tankcode: form.tankcode.trim(),
        capacityLitres: Number(form.capacityLitres),
      });

      setMessage('Water tank added successfully!');

      setForm({
        tankcode: '',
        capacityLitres: '',
        material: '',
        installedDate: '',
      });

      await loadTanks();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to add tank. Check the backend and try again.'
      );
    }
  }

  async function deleteTank(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this tank?'
    );

    if (!confirmed) return;

    setMessage('');
    setError('');

    try {
      await axios.delete(`${API_URL}/Delete/${id}`);
      setMessage('Water tank deleted successfully!');
      await loadTanks();
    } catch {
      setError('Unable to delete the tank.');
    }
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand fw-bold">
          💧 WaterTank Manager
        </span>

        <button
          className="btn btn-light"
          onClick={loadTanks}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Tanks'}
        </button>
      </nav>

      <main className="container py-4">
        <section className="hero-section mb-4">
          <h1>Water Tank Management</h1>
          <p className="mb-0">
            Manage your water tanks easily from one place.
          </p>
        </section>

        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h5 className="mb-0">Add New Tank</h5>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Tank Code</label>
                    <input
                      className="form-control"
                      name="tankcode"
                      value={form.tankcode}
                      onChange={handleChange}
                      placeholder="Example: WT-101"
                      maxLength={30}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Capacity (Litres)
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      name="capacityLitres"
                      value={form.capacityLitres}
                      onChange={handleChange}
                      min="1"
                      step="1"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tank Material</label>
                    <select
                      className="form-select"
                      name="material"
                      value={form.material}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select material</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Concrete">Concrete</option>
                      <option value="Steel">Steel</option>
                      <option value="Fiberglass">Fiberglass</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Installation Date</label>
                    <input
                      className="form-control"
                      type="date"
                      name="installedDate"
                      value={form.installedDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button className="btn btn-primary w-100" type="submit">
                    + Add Water Tank
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Water Tank Records</h5>

                <span className="badge text-bg-primary">
                  {tanks.length} Tanks
                </span>
              </div>

              <div className="card-body">
                {loading ? (
                  <p className="text-center">Loading tank records...</p>
                ) : tanks.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💧</div>
                    <h5>No tanks to display</h5>
                    <p className="text-muted">
                      Add a tank using the form or click Refresh Tanks.
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Tank Code</th>
                          <th>Capacity</th>
                          <th>Material</th>
                          <th>Installed Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {tanks.map((tank) => (
                          <tr key={tank.id}>
                            <td>{tank.id}</td>
                            <td className="fw-semibold">
                              {tank.tankcode}
                            </td>
                            <td>
                              {tank.capacityLitres.toLocaleString()} L
                            </td>
                            <td>{tank.material}</td>
                            <td>{tank.installedDate}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteTank(tank.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3 text-muted">
        WaterTank Manager | Full-Stack Application
      </footer>
    </div>
  );
}

export default App;