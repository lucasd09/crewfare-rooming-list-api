CREATE TABLE "booking" (
	"booking_id" integer PRIMARY KEY NOT NULL,
	"hotel_id" integer,
	"event_id" integer,
	"guest_name" varchar,
	"guest_phone_number" varchar,
	"check_in_date" varchar,
	"check_out_date" varchar
);
--> statement-breakpoint
CREATE TABLE "rooming_list" (
	"rooming_list_id" integer PRIMARY KEY NOT NULL,
	"event_id" integer,
	"event_name" varchar,
	"hotel_id" integer,
	"rfp_name" varchar,
	"cut_off_date" varchar,
	"status" varchar,
	"agreement_type" varchar
);
--> statement-breakpoint
CREATE TABLE "rooming_list_booking" (
	"rooming_list_id" integer,
	"booking_id" integer,
	CONSTRAINT "rooming_list_booking_rooming_list_id_booking_id_pk" PRIMARY KEY("rooming_list_id","booking_id")
);
--> statement-breakpoint
ALTER TABLE "rooming_list_booking" ADD CONSTRAINT "rooming_list_booking_rooming_list_id_rooming_list_rooming_list_id_fk" FOREIGN KEY ("rooming_list_id") REFERENCES "public"."rooming_list"("rooming_list_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooming_list_booking" ADD CONSTRAINT "rooming_list_booking_booking_id_booking_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("booking_id") ON DELETE no action ON UPDATE no action;