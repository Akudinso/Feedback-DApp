// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FeedbackDApp {
    struct Feedback {
        address user;
        string message;
        uint256 timestamp;
    }

    Feedback[] public feedbackList;

    event FeedbackSubmitted(address indexed user, string message, uint256 timestamp);

    function submitFeedback(string calldata _message) external {
        require(bytes(_message).length > 0, "Message cannot be empty");

        feedbackList.push(Feedback(msg.sender, _message, block.timestamp));

        emit FeedbackSubmitted(msg.sender, _message, block.timestamp);
    }

    function getAllFeedback() external view returns (Feedback[] memory) {
        return feedbackList;
    }
}
