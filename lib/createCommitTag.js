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
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
function createCommitTag(client, tag, commitSha) {
    return __awaiter(this, void 0, void 0, function* () {
        const tagRes = yield client.git.createTag(Object.assign({ tag, message: '', object: commitSha, type: 'commit' }, github_1.context.repo));
        yield client.git.createRef(Object.assign({ ref: `refs/tags/${tag}`, sha: tagRes.data.sha }, github_1.context.repo));
    });
}
exports.default = createCommitTag;
