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
exports.serviceServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const service_constant_1 = require("./service.constant");
const service_model_1 = __importDefault(require("./service.model"));
const service_utiles_1 = require("./service.utiles");
const rooms_model_1 = __importDefault(require("../rooms/rooms.model"));
const Apierror_1 = __importDefault(require("../../../errors/Apierror"));
const http_status_1 = __importDefault(require("http-status"));
const createBuilding = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const code = yield (0, service_utiles_1.generateServiceCode)();
    payload.code = code;
    const result = yield service_model_1.default.create(payload);
    return result;
});
// const getAllBuildings = async (filters: any): Promise<any> => {
//   const andConditions = [];
//   const { searchTerm, minPriceRange, maxPriceRange, roomType } = filters;
//   const filter: any = {};
//   if (searchTerm) {
//     ServiceSearchableFields.map((field) => {
//       filter.$or = filter.$or || [];
//       filter.$or.push({ [field]: { $regex: searchTerm, $options: "i" } });
//     });
//   }
//   // filtering based on pricerange and roomType
//   const result = await Service.find(filter).populate("rooms");
//   return result;
// };
const getAllBuildings = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPriceRange, maxPriceRange, roomType, code, category } = filters;
    console.log(filters);
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const aggregationPipeline = [];
    console.log("minpricerange", minPriceRange);
    // Use $lookup at the beginning to populate "rooms"
    aggregationPipeline.push({
        $lookup: {
            from: "rooms",
            localField: "rooms",
            foreignField: "_id",
            as: "rooms",
        },
    });
    // Match services that match the search term
    if (searchTerm) {
        aggregationPipeline.push({
            $match: {
                $or: service_constant_1.ServiceSearchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: "i" },
                })),
            },
        });
    }
    if (category) {
        aggregationPipeline.push({
            $match: {
                category: category,
            },
        });
    }
    if (minPriceRange) {
        aggregationPipeline.push({
            $match: {
                "rooms.pricing": {
                    $gte: Number(minPriceRange),
                },
            },
        });
    }
    if (maxPriceRange) {
        aggregationPipeline.push({
            $match: {
                "rooms.pricing": {
                    $lte: Number(maxPriceRange),
                },
            },
        });
    }
    if (roomType) {
        aggregationPipeline.push({
            $match: {
                "rooms.category": roomType,
            },
        });
    }
    if (code) {
        aggregationPipeline.push({
            $match: {
                code: code,
            },
        });
    }
    console.log(aggregationPipeline);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const result = yield service_model_1.default.aggregate(aggregationPipeline)
        .sort({ _id: 1 })
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            total: result.length,
        },
        data: result,
    };
});
const getSingleBuilding = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findOne({ _id: id }).populate("rooms");
    console.log(result);
    return result;
});
const updateBuilding = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBuilding = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.default.findOne({ _id: id });
    if (!service) {
        throw new Apierror_1.default(http_status_1.default.NOT_FOUND, "service not found");
    }
    const roomIds = service.rooms.map((room) => room._id);
    const deleteRooms = yield rooms_model_1.default.deleteMany({ _id: { $in: roomIds } });
    if (!deleteRooms) {
        throw new Apierror_1.default(http_status_1.default.BAD_REQUEST, "rooms not deleted");
    }
    const result = yield service_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
exports.serviceServices = {
    createBuilding,
    getAllBuildings,
    getSingleBuilding,
    updateBuilding,
    deleteBuilding,
};
