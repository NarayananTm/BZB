"use client";

export default function VisionMission() {
  return (
    <section className="relative -mt-8 pb-28">

      <div className="max-w-[1500px] mx-auto px-8 lg:px-12">

        <div
          className="
            bg-[#171515]
            rounded-[30px]
            overflow-hidden
            shadow-[0_25px_60px_rgba(0,0,0,.18)]
          "
        >
          <div className="grid lg:grid-cols-2">

            {/* ================= LEFT ================= */}

            <div className="px-14 py-14">

              <h2
                className="
                  text-white
                  text-[40px]
                  font-bold
                "
              >
                Our Vision
              </h2>

              <p
                className="
                  mt-8
                  text-white/90
                  text-[20px]
                  leading-10
                "
              >
                To become one of the most trusted real estate
                developers by creating sustainable communities and
                delivering exceptional customer experiences.
              </p>

            </div>

            {/* Divider */}

            <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-px bg-white/20" />

            {/* ================= RIGHT ================= */}

            <div className="relative px-14 py-14 border-t lg:border-t-0 lg:border-l border-white/15">

              <h2
                className="
                  text-white
                  text-[40px]
                  font-bold
                "
              >
                Our Mission
              </h2>

              <ul
                className="
                  mt-8
                  space-y-5
                  text-white/90
                  text-[20px]
                  leading-9
                  list-disc
                  pl-7
                "
              >
                <li>Deliver quality construction</li>

                <li>Build lasting customer relationships</li>

                <li>Create value-driven investment opportunities</li>

                <li>Promote transparency and integrity</li>

                <li>Develop future-ready communities</li>
              </ul>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}