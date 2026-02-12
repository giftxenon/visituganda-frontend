import {
  Modal,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

export default function PaymentModal({ open, onClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const paymentMethods = [
    {
      name: "MTN MoMo",
      img: "/paymentPics/MomoIcon.jpeg",
      requiresAmount: true,
    },
    {
      name: "Airtel Money",
      img: "/paymentPics/AirtelMONEYIcon1.jpeg",
      requiresAmount: true,
    },
    {
      name: "Visa Card",
      img: "/paymentPics/VisaIcon.jpeg",
      requiresAmount: false,
    },
  ];

  const handleProceed = () => {
    setLoading(true);

    // simulate API call
    setTimeout(() => {
      console.log({
        method: selectedMethod.name,
        amount,
        currency: "UGX",
      });

      setLoading(false);
      setPaymentInitiated(true);
    }, 2000);
  };

  const resetState = () => {
    setSelectedMethod(null);
    setAmount("");
    setLoading(false);
    setPaymentInitiated(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "92%", sm: 520 },
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* STEP 1: Choose payment method */}
        {!selectedMethod && (
          <>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Choose a Payment Method
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={2}>
              Select how you would like to pay for this booking.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={2}>
              {paymentMethods.map((method) => (
                <Grid item xs={12} sm={4} key={method.name}>
                  <Card
                    onClick={() => setSelectedMethod(method)}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      textAlign: "center",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        component="img"
                        src={method.img}
                        alt={method.name}
                        sx={{
                          width: "100%",
                          height: 60,
                          objectFit: "contain",
                          mb: 1.5,
                        }}
                      />
                      <Typography fontWeight={600}>
                        {method.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* STEP 2: Amount + Pay */}
        {selectedMethod && !paymentInitiated && (
          <>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              {selectedMethod.name} Payment
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Enter the amount you wish to pay in Ugandan Shillings (UGX).
            </Typography>

            {selectedMethod.requiresAmount && (
              <TextField
                fullWidth
                label="Amount (UGX)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ mb: 3 }}
              />
            )}

            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              disabled={loading || (!amount && selectedMethod.requiresAmount)}
              onClick={handleProceed}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Proceed to Pay"
              )}
            </Button>

            <Button
              variant="text"
                color="success"
              fullWidth
              sx={{ mt: 1 }}
              disabled={loading}
              onClick={resetState}
            >
              Back
            </Button>
          </>
        )}

        {/* STEP 3: Payment initiated message */}
        {paymentInitiated && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Payment Initiated
            </Typography>

            <Typography variant="body2" color="text.secondary">
              We have initiated your {selectedMethod.name} payment.
              <br />
              You will be notified once the payment is successfully completed.
            </Typography>

            <Button
              variant="contained"
                color="success"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => {
                resetState();
                onClose();
              }}
            >
              Close
            </Button>

            
          </Box>
        )}

        {/* Refund Notice */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "#f5f7fa",
            borderRadius: 2,
            borderLeft: "4px solid #4caf50",
          }}
        >
          <Typography fontWeight={600} mb={0.5}>
            Refund Policy Notice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Payments are fully refundable if a cancellation request is made
            at least <strong>3 days before</strong> the agreed pickup date.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
