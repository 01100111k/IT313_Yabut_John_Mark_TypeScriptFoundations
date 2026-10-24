"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeAverage = exports.EnrollmentStatus = void 0;
var EnrollmentStatus;
(function (EnrollmentStatus) {
    EnrollmentStatus["Passing"] = "PASSING";
    EnrollmentStatus["Probation"] = "PROBATION";
})(EnrollmentStatus || (exports.EnrollmentStatus = EnrollmentStatus = {}));
const computeAverage = (prelim, midterm, final) => {
    return (prelim + midterm + final) / 3;
};
exports.computeAverage = computeAverage;
const getStatus = (average) => {
    if (average >= 75) {
        return EnrollmentStatus.Passing;
    }
    return EnrollmentStatus.Probation;
};
exports.default = getStatus;
