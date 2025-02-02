import React, { useState } from "react";
import Tender from "../Tenders/MuniTenderMini"; // Update the import path if necessary
import { FaInfoCircle, FaTimes } from "react-icons/fa";

type Status = "Unassigned" | "Active" | "Rejected" | "Closed";

interface TenderType {
  tender_id: string;
  tendernumber : string;
  company_id : string;
  companyname : string;
  datetimesubmitted : string;
  ticket_id: string;
  ticketnumber : string;
  status: string;
  quote: number;
  estimatedTimeHours: number;
  longitude : string;
  latitude : string;
  upload: File | null;
  hasReportedCompletion: boolean;
}



const statusStyles = {
  'Unassigned': 'text-blue-500 border-blue-500 rounded-full',
  'Active': 'text-black bg-green-200 rounded-full',
  'Rejected': 'text-black bg-red-200 rounded-full',
  'Closed': 'text-black bg-gray-200 rounded-full',
};





export default function ActiveTenders({tenders,refresh} : {tenders: TenderType[], refresh : ()=> void}) {
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 10;
  const [selectedTender, setSelectedTender] = useState<TenderType | null>(null);

  // Calculate pagination details
  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = tenders.slice(indexOfFirstTender, indexOfLastTender);
  const totalPages = Math.ceil(tenders.length / tendersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClose = (data: number) => {
    refresh();
  }

  return (
    <div className="overflow-x-auto bg-transparent rounded-lg shadow-md">
      <div className="min-w-full text-white text-opacity-80 rounded-t-lg text-black relative">
        <div className="grid grid-cols-6 gap-4 items-center mb-2 px-2 py-1 font-bold text-center border-b border-gray-200">
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Tender ID</div>
          <div className="col-span-1">Service Provider</div>
          <div className="col-span-1">Issue Date</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-1">Estimated Duration</div>
        </div>
        <div className="min-w-full">
          {currentTenders.map((tender) => (
            <Tender key={tender.tender_id} onClose={handleClose} tender={tender} />
          ))}
        </div>

        {currentTenders.length > 0 && (
          <div className="flex justify-between mt-4 text-white">
            <button
              onClick={handlePrevPage}
              className={`px-48 py-2 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className={`px-48 py-2 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
