// ==============================
// NomNom Server + Socket.IO
// ==============================
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const sql = require("mssql");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());


// ==============================
// SQL SERVER CONFIG
// ==============================
const dbConfig = {
    user: "nomnom",        // SQL login bạn tạo
    password: "1234",
    server: "localhost",   // Với SQL Express → luôn là localhost
    port: 52919,           // Port bạn xem trong SQL Configuration Manager
    database: "NomNomDB",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

// Pool SQL dùng chung (tối ưu)
let poolPromise;
async function getPool() {
    try {
        if (!poolPromise) {
            console.log("Connecting to SQL...");
            poolPromise = sql.connect(dbConfig);
        }
        return poolPromise;
    } catch (err) {
        console.error("SQL CONNECT ERROR:", err);
        throw err;
    }
}


// ==============================
// TEST ROUTE
// ==============================
app.get("/", (req, res) => {
    res.send("NomNom API is running");
});


// ==============================
// GET ALL RECIPES
// ==============================
app.get("/recipes", async (req, res) => {
    try {
        const pool = await getPool();

        const result = await pool
            .request()
            .query("SELECT Id, Title, Category FROM dbo.Recipes ORDER BY Id DESC");

        res.json(result.recordset);
    } catch (err) {
        console.error("GET /recipes ERROR:", err);
        res.status(500).json({
            error: "Server error",
            message: err.message,
        });
    }
});


// ==============================
// GET RECIPE BY ID
// ==============================
app.get("/recipes/:id", async (req, res) => {
    try {
        const pool = await getPool();

        const result = await pool
            .request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT * FROM dbo.Recipes WHERE Id = @id");

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error("GET /recipes/:id ERROR:", err);
        res.status(500).json({ error: "Server error", message: err.message });
    }
});


// ==============================
// SOCKET.IO
// ==============================
io.on("connection", socket => {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});


// ==============================
// START SERVER
// ==============================
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`NomNom API + Socket.IO server running on port ${PORT}`);
});
