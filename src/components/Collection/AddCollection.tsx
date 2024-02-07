"use client";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BookmarkSimple, Circle } from "@phosphor-icons/react";
import {
  addCollection,
  deleteCollectionByMalId,
  getCollectionByMalId,
} from "@/lib/api/services";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface AddCollectionProps {
  mal_id: number;
  anime_image: string;
  anime_title: string;
}

const AddCollection: FunctionComponent<AddCollectionProps> = ({
  mal_id,
  anime_image,
  anime_title,
}) => {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState<boolean>(false);

  const addCollectionHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = { mal_id, anime_image, anime_title };
      await addCollection({ data });
      setIsAlreadyAdded(true);
      toast.success("Success added to my collection");
    } catch (error: any) {
      setIsAlreadyAdded(false);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [anime_image, anime_title, mal_id]);

  const deleteCollectionHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await deleteCollectionByMalId(mal_id);
      setIsAlreadyAdded(false);
      toast.success("Success delete from my collection");
    } catch (error: any) {
      setIsAlreadyAdded(true);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [mal_id]);

  useEffect(() => {
    (async () => {
      const result = await getCollectionByMalId(mal_id);
      if (result?.id) {
        setIsAlreadyAdded(true);
      } else {
        setIsAlreadyAdded(false);
      }
    })();
  }, [mal_id]);

  return (
    session?.accessToken && (
      <div>
        <button
          className="m-0 p-0 flex items-center"
          type="button"
          title={
            isAlreadyAdded
              ? "Remove from My Collection"
              : "Add to My Collection"
          }
          onClick={
            isAlreadyAdded ? deleteCollectionHandler : addCollectionHandler
          }
        >
          {!isLoading ? (
            <BookmarkSimple
              size={24}
              className={isAlreadyAdded ? "text-red-400" : "text-teal-400"}
            />
          ) : (
            <Circle size={24} className="text-red-500 animate-pulse" />
          )}
        </button>
      </div>
    )
  );
};

export default AddCollection;
