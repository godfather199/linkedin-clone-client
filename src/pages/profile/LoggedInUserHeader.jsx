// vs code 1.842 (user setup) 


import { Button } from "@mui/material";
import { useEffect } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { thunk_Update_User } from "../../store/slices/userSlice";

const dummy_Hashtags = ['something']
const dummy_About = ['something']
const dummy_Previous_Occupation = [{
  title: 'something',
  company: 'something',
  timeline: 'something'
}]


function LoggedInUserHeader() {
  const dispatch = useDispatch()

  const {currentUser} = useSelector(state => state.user)

  const { register, handleSubmit, watch, formState, control } = useForm({
    defaultValues: {
      name: currentUser?.name,
      username: currentUser?.username,
      email: currentUser?.email,
      tagline: currentUser?.tagline,
      city: currentUser?.city,
      education: {
        name: currentUser?.education?.name,
        timeline: currentUser?.education?.timeline,
      },
      hashtags:
        currentUser?.hashtags.length !== 0
          ? currentUser?.hashtags
          : dummy_Hashtags,
      about: currentUser?.about.length !== 0 ? currentUser?.about : dummy_About,
      previousOccupation:
        currentUser?.previousOccupation.length !== 0
          ? currentUser?.previousOccupation
          : dummy_Previous_Occupation,
    },
  });


  const {fields: hashFields, append: hashAppend, remove: hashRemove} = useFieldArray({
    name: 'hashtags',
    control
  })

  // console.log('Hashtags: ', hashFields)



  const {fields: aboutFields, append: aboutAppend, remove: aboutRemove} = useFieldArray({
    name: 'about',
    control
  })


  const {
    fields: previousOccupationFields,
    append: previousOccupationAppend,
    remove: previousOccupationRemove,
  } = useFieldArray({
    name: "previousOccupation",
    control,
  });


  // console.log('Hashtags: ', hashFields)
  // console.log('About: ', aboutFields)


  const handle_Add_Previous_Occupation = () => {
    // console.log('This function ran')
    // return

    // e.stopPropagation();
    // previousOccupationAppend({
    //   // title: "",
    //   // company: "",
    //   // timeline: "",
    // });

    previousOccupationAppend()
  }



  const handle_Form_Submit = (data) => {
    console.log('Inside submit function')
    // return

    // console.log('User info: ', data)
    dispatch(thunk_Update_User(data))

    

  //  const result =  Object.keys(formState.dirtyFields).map((item) => {
  //     console.log(`${item}: ${data[item]}`)
  //  })

    // console.log('Dirty: ', formState.dirtyFields)
  }



  return (
    <div
      // style={{ border: "3px solid red" }}
      className="w-[95%]  md:w-full mx-2 flex items-center justify-center my-[6rem]"
    >
      <form
        // style={{ border: "3px solid purple" }}
        onSubmit={handleSubmit(handle_Form_Submit)}
        className="w-full flex flex-col p-5 m-5 gap-8"
        autoComplete="off"
      >
        <div className="">
          <label className=" text-lg text-gray-700 font-semibold">Name:</label>
          <input
            type="text"
            {...register("name")}
            className="ml-10 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2"
          />
        </div>

        <div className="border border-gray-200" />

        <div className="">
          <label className="text-lg text-gray-700 font-semibold">
            Username:
          </label>
          <input
            type="text"
            {...register("username")}
            className="ml-5 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2"
            // placeholder="Username"
          />
        </div>

        <div className="border border-gray-200" />

        <div className="">
          <label className="text-lg text-gray-700 font-semibold">Email:</label>
          <input
            type="email"
            {...register("email")}
            className="ml-5 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2"
          />
        </div>

        <div className="border border-gray-200" />

        <div className="">
          <label className="text-lg text-gray-700 font-semibold">
            Tagline:
          </label>
          <input
            type="text"
            {...register("tagline")}
            className="ml-5 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-2/3"
          />
        </div>

        <div className="border border-gray-200" />

        <div className="flex flex-col">
          <label className="text-lg text-gray-700 font-semibold mb-5">
            Hashtags
          </label>
          {hashFields.map((item, idx) => (
            <div
              // style={{ border: "3px solid green" }}
              className="flex flex-col sm:flex gap-5 mb-5"
              key={item.id}
            >
              <div className="">
                <label className="text-md text-gray-700 font-semibold">
                  Name:
                </label>
                <input
                  type="text"
                  {...register(`hashtags[${idx}]`)}
                  defaultValue={item}
                  className="ml-5 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-[20rem]"
                  placeholder="Add a Hashtag"
                />
              </div>
              <div className="flex gap-5">
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  type="button"
                  className=""
                  onClick={() => hashRemove(idx)}
                >
                  Remove Hashtag
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  type="button"
                  className=""
                  onClick={() => hashAppend()}
                >
                  Add Hashtag
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200" />

        <div className="">
          <label className="text-lg text-gray-700 font-semibold">City:</label>
          <input
            type="text"
            {...register("city")}
            className="ml-5 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-1/3"
          />
        </div>

        <div className="border border-gray-200" />

        <div className="">
          <label className="text-lg text-gray-700 font-semibold">About:</label>
          {aboutFields.map((item, idx) => (
            <div className="" key={item.id}>
              <div className="flex items-center justify-center p-2 mb-2">
                <label className="text-md text-gray-700 font-semibold">
                  Name:
                </label>
                <input
                  type="text"
                  {...register(`about[${idx}]`)}
                  defaultValue={item}
                  className="ml-5 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-full"
                />
              </div>
              <div className="flex items-center justify-center gap-5 my-5">
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  type="button"
                  className=""
                  onClick={() => aboutRemove(idx)}
                >
                  Remove About
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  type="button"
                  className=""
                  onClick={() => aboutAppend({})}
                >
                  Add About
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200" />

        <div
          // style={{ border: "3px solid red" }}
          className="flex flex-col gap-3"
        >
          <span className="text-lg text-gray-700 font-semibold">Education</span>
          <div className="flex flex-col gap-5">
            <div className="flex items-center">
              <label className="text-md text-gray-700 font-semibold">
                Name:
              </label>
              <input
                type="text"
                {...register("education.name")}
                className="ml-10 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-1/2"
              />
            </div>
            <div className="flex items-center">
              <label className="text-md text-gray-700 font-semibold">
                Timeline:
              </label>
              <input
                type="text"
                {...register("education.timeline")}
                className="ml-6 outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-1/2"
                // placeholder="Tagline"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200" />

        <div className="">
          <label className="text-lg text-gray-700 font-semibold">
            Previous Occupation:
          </label>
          <div className="">
            {previousOccupationFields.map((item, idx) => (
              <div key={item.id} className="">
                <div className="flex items-center justify-center p-2 mb-2">
                  <label className="text-md text-gray-700 font-semibold ">
                    Title:
                  </label>
                  <input
                    type="text"
                    {...register(`previousOccupation[${idx}].title`)}
                    defaultValue={item.title}
                    className="ml-[4rem] outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-full "
                  />
                </div>
                <div className="flex items-center justify-center p-2 mb-2">
                  <label className="text-md text-gray-700 font-semibold">
                    Company:
                  </label>
                  <input
                    type="text"
                    {...register(`previousOccupation[${idx}].company`)}
                    defaultValue={item.company}
                    className="ml-[1.6rem] outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-full"
                  />
                </div>
                <div className="flex items-center justify-center p-2 mb-2">
                  <label className="text-md text-gray-700 font-semibold">
                    Timeline:
                  </label>
                  <input
                    type="text"
                    {...register(`previousOccupation[${idx}].timeline`)}
                    defaultValue={item.timeline}
                    className="ml-[1.9rem] outline-none text-sm text-gray-400 font-medium border border-b-blue-400 p-2 w-full"
                  />
                </div>
                <div className="flex items-center justify-center gap-5 my-5">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => previousOccupationRemove(idx)}
                    className=""
                  >
                    Remove Previous Occupation
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handle_Add_Previous_Occupation}
                    className=""
                  >
                    Add Previous Occupation
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200" />

        <div className="my-2">
          <Button
            variant="contained"
            color="success"
            type="submit"
            className=""
          >
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoggedInUserHeader
