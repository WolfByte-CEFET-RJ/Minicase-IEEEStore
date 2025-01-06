import { ReactNode } from "react"

interface ProductCategorySectionProps {
    nameCategory: string
    children?: ReactNode
}

export default function ProductCategorySection(props: ProductCategorySectionProps) {
    return (
        <section className="w-full rounded-md p-5 my-8 border shadow-md shadow-gray-100">
            <h2 className="font-medium text-xl pb-5">{props.nameCategory}</h2>
            <div className="flex gap-4">{props.children}</div>
        </section>
    )
}