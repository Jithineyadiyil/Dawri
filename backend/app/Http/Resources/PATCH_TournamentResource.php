<?php

/**
 * PATCH FILE — TournamentResource `is_registered` field.
 *
 * In your existing TournamentResource::toArray() method, add this field
 * to the returned array:
 *
 *   'is_registered' => $this->isRegisteredForUser($request),
 *
 * Then add this private method to the TournamentResource class:
 */

/*

    // Add this to the return array in toArray():
    'is_registered' => $this->isRegisteredForUser($request),

    // Add this method to the class:
    private function isRegisteredForUser(Request $request): bool
    {
        $user = $request->user();

        if ($user === null) {
            return false;
        }

        // Check if the _is_registered flag was set (from myTournaments)
        if (property_exists($this->resource, '_is_registered') && $this->resource->_is_registered) {
            return true;
        }

        return $this->participants()
            ->where('user_id', $user->id)
            ->where('status', 'registered')
            ->exists();
    }

*/
