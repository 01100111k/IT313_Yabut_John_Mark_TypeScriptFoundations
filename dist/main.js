"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gradeUtils_1 = require("./gradeUtils");
const gradeUtils_2 = __importDefault(require("./gradeUtils"));
const enrollees = [
    {
        name: "Ana Cruz",
        prelim: 85,
        midterm: 90,
        final: 88
    },
    {
        name: "Bea Santos",
        prelim: 70,
        midterm: 65,
        final: 60
    },
    {
        name: "Cid Reyes",
        prelim: 95,
        midterm: 92,
        final: 97
    },
    {
        name: "Dex Garcia",
        prelim: 60,
        midterm: 55,
        final: 50
    },
    {
        name: "Eli Ramos",
        prelim: 78,
        midterm: 80,
        final: 76
    }
];
let batchId = "BATCH-001";
function showBatchId(id) {
    if (typeof id === "string") {
        return `String Batch ID: ${id}`;
    }
    return `Number Batch ID: ${id}`;
}
function groupBy(items, keyFn) {
    return items.reduce((groups, item) => {
        const key = keyFn(item);
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}
function getEnrollees() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 1000);
    });
}
async function main() {
    try {
        console.log("Connecting to registrar API...");
        console.log(showBatchId(batchId));
        const data = await getEnrollees();
        const reports = data.map((enrollee) => {
            const average = (0, gradeUtils_1.computeAverage)(enrollee.prelim, enrollee.midterm, enrollee.final);
            const status = (0, gradeUtils_2.default)(average);
            return {
                name: enrollee.name,
                average,
                status,
                ...(status === gradeUtils_1.EnrollmentStatus.Probation
                    ? { remarks: "Needs consultation" }
                    : {})
            };
        });
        const classAverage = reports.reduce((sum, report) => {
            return sum + report.average;
        }, 0) / reports.length;
        const groupedReports = groupBy(reports, (report) => report.status);
        const passingCount = groupedReports[gradeUtils_1.EnrollmentStatus.Passing]?.length ?? 0;
        console.log("\n=== IT313 Enrollment Eligibility Report (TypeScript) ===");
        reports.forEach((report) => {
            const remarks = report.remarks
                ? ` - ${report.remarks}`
                : "";
            console.log(`${report.name} - Average: ${report.average.toFixed(2)} - ${report.status}${remarks}`);
        });
        console.log(`Class Average: ${classAverage.toFixed(2)}`);
        console.log(`Passing: ${passingCount} / ${reports.length}`);
    }
    catch (error) {
        console.error("Failed to connect to registrar API:", error);
    }
}
main();
