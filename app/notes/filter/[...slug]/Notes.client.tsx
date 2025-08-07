"use client";

import css from "./Notes.client.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ReactPaginate from "react-paginate";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/CreateNoteModal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { GetResponse } from "@/lib/api";

type NoteClientProps = {
  startData: GetResponse;
  category: string;
};

export default function NoteClient({ startData, category }: NoteClientProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notes", query, page, category],
    queryFn: () => fetchNotes(query, page, category),
    placeholderData: keepPreviousData,
    initialData: startData,
    refetchOnMount: false,
  });

  const handleQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  }, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChangeQuery={handleQueryChange} query={query} />
        {data && data.totalPages > 1 && (
          <ReactPaginate
            pageCount={data.totalPages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onClose={closeModal} />
          </Modal>
        )}
      </header>
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error: {error.message}</span>}
      {isSuccess && data && <NoteList notes={data.notes} />}
    </div>
  );
}
