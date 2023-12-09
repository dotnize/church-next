"use client";

import { Spinner, Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getBaptismById } from "~/actions/baptism";
import { getConfirmationById } from "~/actions/confirmation";
import { getDeceasedById } from "~/actions/deceased";
import { getMarriageById } from "~/actions/marriage";

export default function Status({ type, id }: { type: "c" | "m" | "b" | "d"; id: number }) {
  const pathname = usePathname();
  const certType =
    type === "c" ? "Confirmation" : type === "m" ? "Marriage" : type === "b" ? "Baptism" : "Death";

  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  async function fetchCert() {
    setLoading(true);
    let data = null;
    if (type === "c") {
      data = await getConfirmationById(id);
    } else if (type === "m") {
      data = await getMarriageById(id);
    } else if (type === "b") {
      data = await getBaptismById(id);
    } else if (type === "d") {
      data = await getDeceasedById(id);
    }
    if (data?.length && data[0]?.id) setCert(data[0]);
    setLoading(false);
  }

  useEffect(() => {
    setCurrentUrl(window.location.origin + pathname);
    fetchCert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyLink() {
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(currentUrl);
    } else {
      document.execCommand("copy", true, currentUrl);
    }
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 5000);
  }

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white bg-opacity-70 p-10">
      {loading && !cert && <Spinner />}

      {!loading && !cert && <div>No certificate request found.</div>}

      {cert && (
        <>
          <div className="text-2xl font-bold">{certType} Certificate Request</div>
          <div className="flex flex-col gap-1">
            <div className="text-lg font-medium">
              Status:{" "}
              <span
                className={`${cert.status !== "Pending" && "font-bold"} ${
                  cert.status === "Released" && "text-emerald-600"
                } ${cert.status === "Invalid" && "text-red-500"}`}
              >
                {cert.status}
              </span>
            </div>
            <div>Requested by: {cert.requester_name.split(" ")[0]}</div>
          </div>
          {cert.status !== "Released" && (
            <div className="flex flex-col gap-1">
              <span className="text-sm">Save the link below to check the status anytime:</span>
              <Tooltip placement="bottom" isOpen={copiedLink} content="Link copied to clipboard.">
                <input
                  type="text"
                  value={currentUrl}
                  readOnly
                  onClick={copyLink}
                  className="rounded-md bg-white p-2 shadow"
                  onFocus={(e) => e.target.select()}
                />
              </Tooltip>
            </div>
          )}
        </>
      )}
    </div>
  );
}
