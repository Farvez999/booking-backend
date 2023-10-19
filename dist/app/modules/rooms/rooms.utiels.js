"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRoomId = exports.findLastRoomId = void 0;
const rooms_model_1 = __importDefault(require("./rooms.model"));
const findLastRoomId = () => __awaiter(void 0, void 0, void 0, function* () {
    const roomId = yield rooms_model_1.default.findOne({
        forCheck: "rooms",
    })
        .sort({
        createdAt: 1,
    })
        .lean();
    return (roomId === null || roomId === void 0 ? void 0 : roomId.roomId) ? roomId.roomId.substring(4) : undefined;
});
exports.findLastRoomId = findLastRoomId;
const generateRoomId = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const currentCode = (yield (0, exports.findLastRoomId)()) || (0).toString().padStart(5, "0"); //00000
    //increment by 1
    let incrementCode = (parseInt(currentCode) + 1).toString().padStart(5, "0");
    //20 25
    incrementCode = `${title}-${incrementCode}`;
    return incrementCode;
});
exports.generateRoomId = generateRoomId;
