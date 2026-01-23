"use client";

import MotorcycleForm from "@/components/admin/MotorcycleForm";
import { use } from "react";

export default function EditMotorcyclePage({ params }) {
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    return (
        <div className="container mx-auto">
            <MotorcycleForm id={id} />
        </div>
    );
}
