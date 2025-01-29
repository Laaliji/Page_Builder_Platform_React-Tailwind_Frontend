"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Invoice() {
  const invoiceItems = [
    { description: "Web Design", quantity: 1, unitPrice: 500, total: 500 },
    { description: "Hosting", quantity: 12, unitPrice: 20, total: 240 },
    { description: "Domain Name", quantity: 1, unitPrice: 50, total: 50 },
  ];

  const calculateTotal = () =>
    invoiceItems.reduce((acc, item) => acc + item.total, 0);
  const total = calculateTotal();
  const vat = total * 0.2;
  const totalWithVat = total * 1.2;

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Facture</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6 text-muted-foreground"
            >
              <path d="M20 16v-6l-4-4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-muted-foreground">De</Label>
                <p>Votre Entreprise SARL</p>
                <p>123 Rue de l'Entreprise</p>
                <p>75000 Paris, France</p>
              </div>
              <div className="text-right">
                <Label className="text-muted-foreground">Facture #</Label>
                <p>
                  INV-{new Date().getFullYear()}-
                  {Math.floor(Math.random() * 1000)}
                </p>
                <Label className="text-muted-foreground mt-2">Date</Label>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="border rounded-lg">
              <div className="grid grid-cols-4 bg-gray-100 p-2 font-semibold text-sm">
                {["Description", "Quantité", "Prix Unitaire", "Total"].map(
                  (header) => (
                    <div
                      key={header}
                      className={header === "Description" ? "" : "text-right"}
                    >
                      {header}
                    </div>
                  )
                )}
              </div>
              {invoiceItems.map((item, index) => (
                <div key={index} className="grid grid-cols-4 p-2 border-t">
                  <div>{item.description}</div>
                  <div className="text-right">{item.quantity}</div>
                  <div className="text-right">
                    {item.unitPrice.toFixed(2)} €
                  </div>
                  <div className="text-right">{item.total.toFixed(2)} €</div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <div className="w-48">
                {[
                  { label: "Sous-total", value: total.toFixed(2) },
                  { label: "TVA (20%)", value: vat.toFixed(2) },
                  {
                    label: "Total TTC",
                    value: totalWithVat.toFixed(2),
                    bold: true,
                  },
                ].map(({ label, value, bold }) => (
                  <div
                    key={label}
                    className={`flex justify-between ${
                      bold ? "font-bold" : ""
                    }`}
                  >
                    <span>{label}</span>
                    <span>{value} €</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Télécharger PDF</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
