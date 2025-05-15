// //send resume pdf to client
// import { NextResponse } from 'next/server';
// //fs
// import fs from 'fs';
// //path
// import path from 'path';

// export async function GET() {
//     //get the path to the resume pdf
//     const resumePath = path.join(process.cwd(), 'public','resume','Resume.pdf');
//     const data = fs.readFileSync(resumePath);
//     console.log(data);
//     const res = NextResponse.send(data, {
//         status: 200,
//         headers: {
//             "Content-Type": "application/pdf",
//             "Content-Disposition": "attachment; filename=Mahadevan_Reji_Resume.pdf",
//         }
//     });
//     return res;
// }
