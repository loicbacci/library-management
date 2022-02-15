import React, { useEffect, useState } from 'react';
import { Heading, Stack, Text, useToast } from '@chakra-ui/react';
import PageLayout from '../common/PageLayout';
import AddButton from '../common/AddButton';
import { addLoan, editLoan, getCurrentLoans, removeLoan } from '../firebase/loans';
import LoansListEntry from './LoansListEntry';
import AddLoanModal from './AddLoanModal';
import ViewLoanModal from './ViewLoanModal';
import { useNavigate, useParams } from 'react-router-dom';


const Loans = () => {
  // React Router hooks
  const params = useParams();
  const navigate = useNavigate();

  // Toast
  const toast = useToast();

  // Loans
  const [loans, setLoans] = useState([] as Loan[]);
  const [initialized, setInitialized] = useState(false);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null as Loan | null);

  // Selected loan handler
  useEffect(() => {
    if (params.loanId) {
      const loan = loans.find(c => c.id === params.loanId)
      if (loan) {
        setSelectedLoan(loan);
        setShowViewModal(true);
      } else if (initialized) {
        toast({
          title: "Failed to find loan",
          status: "error",
          isClosable: true
        });
        navigate("/loans");
      }
    }
  }, [params, loans, navigate, initialized, toast]);

  // Set listener for client list updates
  useEffect(() => {
    getCurrentLoans(loans => {
      setLoans(loans);
      setInitialized(true);
    });
  }, []);


  const addLoanHandler = (bookId: string, clientId: string, date: Date) => {
    setShowAddModal(false);
    addLoan(bookId, clientId, date)
      .then(() => {
        toast({
          title: "Successfully added client",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Failed to add client",
          description: reason,
          status: "error",
          isClosable: true
        })
      });
  }

  const viewModalClose = () => {
    setShowViewModal(false);
    setSelectedLoan(null);
    navigate("/loans");
  }


  // Handlers
  const loanClick = (loan: Loan) => () => {
    navigate(`/loans/${loan.id}`);
  }

  const handleDelete = () => {
    if (!selectedLoan) return;

    removeLoan(selectedLoan.id)
      .then(() => {
        toast({
          title: "Delete successful",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Delete failed",
          description: reason,
          status: "error",
          isClosable: true
        })
      })

    viewModalClose();
  }

  const handleEdit = (newLoan: Loan) => {
    editLoan(newLoan)
      .then(() => {
        toast({
          title: "Edit successful",
          status: "success",
          isClosable: true
        })
      })
      .catch((reason) => {
        toast({
          title: "Edit failed",
          description: reason,
          status: "error",
          isClosable: true
        })
      })

    viewModalClose();
  }

  return (
    <PageLayout>
      <Heading as="h2">Loans</Heading>

      <Stack>
        {loans.map(loan => (
          <LoansListEntry
            loan={loan}
            onClick={loanClick(loan)}
            key={loan.id}
          />
        ))}
      </Stack>

      <AddButton onClick={() => setShowAddModal(true)}>
        <Text>Add loan</Text>
      </AddButton>

      <AddLoanModal
        shown={showAddModal}
        onClose={() => setShowAddModal(false)}
        addLoan={addLoanHandler}
      />

      {selectedLoan && <ViewLoanModal
        shown={showViewModal}
        onClose={viewModalClose}
        loan={selectedLoan}
        editLoan={handleEdit}
        handleDelete={handleDelete}
      />}
    </PageLayout>
  )
};

export default Loans;
