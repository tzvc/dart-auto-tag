"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
const yaml = __importStar(require("js-yaml"));
function getPubspecVersion(client, path) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pubspecRes = yield client.repos.getContents(Object.assign({ path, ref: github_1.context.ref || 'master' }, github_1.context.repo));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pubspecBase64 = pubspecRes.data['content'];
            const pubspecYaml = Buffer.from(pubspecBase64, 'base64').toString('utf8');
            const pubspec = yaml.safeLoad(pubspecYaml);
            if (!pubspec)
                return null;
            if (typeof pubspec == 'string')
                return pubspec;
            return pubspec['version'];
        }
        catch (err) {
            if (err.status === 404)
                return null;
            throw err;
        }
    });
}
exports.default = getPubspecVersion;
