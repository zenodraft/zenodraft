"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_api = void 0;
const get_api = (sandbox) => {
    return `https://${sandbox ? 'sandbox.' : ''}zenodo.org/api`;
};
exports.get_api = get_api;
