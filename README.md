## 📊 Number Stream Window API

This project is a Node.js-based API that fetches number streams (prime, Fibonacci, even, random) from a remote service, maintains a sliding window of the most recent unique values in a PostgreSQL database, and calculates the average.

### ✅ Features

* Fetches number lists from different streams using access tokens
* Maintains a **fixed-size sliding window** of unique numbers in a PostgreSQL database
* Calculates and returns the **average** of the current window
* Automatically obtains API token using `clientID` and `clientSecret`
* Provides JSON API and serves a static HTML frontend

---

### 📁 Project Structure

```
project/
├── public/                 # Static frontend files (HTML/CSS/JS)
│   └── index.html
├── services/
│   └── numberService.js    # Core logic for fetching, inserting, and averaging
├── db.js                   # PostgreSQL pool configuration
├── server.js               # Main Express server
├── .env                    # Environment variables
└── README.md               # This file
```

---

### 🔧 Requirements

* Node.js (v14+)
* PostgreSQL
* Internet access to reach the remote number APIs

---

### 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up PostgreSQL**

Create a database called `avg_calc` and a table:

```sql
CREATE TABLE numbers (
  value INTEGER PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```



### 🚀 Running the Server

```bash
node server.js
```

Visit: [http://localhost:5050](http://localhost:5050)

---

### 📡 API Usage

#### Endpoint: `GET /numbers/:id`

* `:id` can be:

  * `p` → Prime numbers
  * `f` → Fibonacci numbers
  * `e` → Even numbers
  * `r` → Random numbers

#### Example Response

```json
{
  "windowPrevState": [2, 3, 5],
  "windowCurrState": [2, 3, 5, 7],
  "numbers": [7, 11, 13],
  "avg": 6.75
}
```

---

