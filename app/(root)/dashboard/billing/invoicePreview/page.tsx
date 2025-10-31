"use client"

import InvoicePreview from "@/components/dashboard/billing/InvoicePreview";
import { useState } from "react";

export default function Home() {
    const [shadowPreview, setShowPreview] = useState(false)

    if(shadowPreview) {
        return <InvoicePreview />;
    }

    return <div></div>;
}