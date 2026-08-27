"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExcelIfNotExists = createExcelIfNotExists;
exports.readUsers = readUsers;
exports.saveUser = saveUser;
exports.findUserByEmail = findUserByEmail;
exports.findUserByMobile = findUserByMobile;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const DATA_FILE = path_1.default.join(process.cwd(), 'data', 'users.json');
function ensureDataDir() {
    fs_1.default.mkdirSync(path_1.default.dirname(DATA_FILE), { recursive: true });
}
function ensureDataFile() {
    ensureDataDir();
    if (!fs_1.default.existsSync(DATA_FILE)) {
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
    }
}
function createExcelIfNotExists() {
    ensureDataFile();
}
function readUsers() {
    ensureDataFile();
    try {
        const raw = fs_1.default.readFileSync(DATA_FILE, 'utf8').trim();
        if (!raw) {
            return [];
        }
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed)
            ? parsed.filter((row) => row?.Email || row?.Mobile)
            : [];
    }
    catch {
        fs_1.default.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
        return [];
    }
}
function saveUser(user) {
    ensureDataFile();
    const users = readUsers();
    const nextId = users.length > 0 ? Math.max(...users.map((item) => item.ID || 0)) + 1 : 1;
    const newUser = {
        ID: user.ID ?? nextId,
        FullName: user.FullName,
        Email: user.Email,
        Mobile: user.Mobile,
        Password: user.Password,
        CreatedDate: user.CreatedDate,
    };
    const updatedUsers = [...users, newUser];
    fs_1.default.writeFileSync(DATA_FILE, JSON.stringify(updatedUsers, null, 2), 'utf8');
}
function findUserByEmail(email) {
    const users = readUsers();
    return users.find((user) => user.Email.toLowerCase() === email.toLowerCase());
}
function findUserByMobile(mobile) {
    const users = readUsers();
    return users.find((user) => user.Mobile === mobile);
}
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password, 10);
}
function comparePassword(password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
}
