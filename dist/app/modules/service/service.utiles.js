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
exports.generateServiceCode = exports.findLastServiceId = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const service_model_1 = __importDefault(require("./service.model"));
const findLastServiceId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastBuilding = yield service_model_1.default.findOne({
        forCheck: "building",
    }, { _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastBuilding === null || lastBuilding === void 0 ? void 0 : lastBuilding.code) ? lastBuilding.code.substring(4) : undefined;
});
exports.findLastServiceId = findLastServiceId;
const generateServiceCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentCode = (yield (0, exports.findLastServiceId)()) || (0).toString().padStart(5, "0"); //00000
    //increment by 1
    let incrementCode = (parseInt(currentCode) + 1).toString().padStart(5, "0");
    //20 25
    incrementCode = `B-${incrementCode}`;
    return incrementCode;
});
exports.generateServiceCode = generateServiceCode;
