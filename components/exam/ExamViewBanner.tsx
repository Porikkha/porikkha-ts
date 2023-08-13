"use client";

import Link from "next/link";
import { useState } from "react";
import {
	Input,
	Switch,
	Typography,
	Modal,
	ModalDialog,
	Stack,
	FormControl,
	FormLabel,
	Button,
} from "@mui/joy";
import Label from "@/components/ui/Labels";

export default function ExamViewBanner({ exam }: any) {
	return (
		<div className="px-20 py-10 w-4/5 mx-auto bg-white rounded-xl items-center space-x-4">
			<div className="w-full">
				<div className="w-full">
					<div className="text-3xl font-bold font-sans text-black">
						{exam.title}
					</div>
					<div className="text-sm font-semibold font-sans text-slate-500 py-3">
						{exam.startTime.toTimeString()}
					</div>
					<div>
            <ul className="pl-5 space-y-3 text-gray-600 list-disc marker:text-[#7FF]">
  <li>Tailwind CSS list style with marker custom color </li>
  <li>Tailwind CSS list style with marker custom color </li>
  <li>Tailwind CSS list style with marker custom color </li>
</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
